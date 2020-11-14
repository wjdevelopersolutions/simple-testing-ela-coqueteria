const Product = require('../models/product.model');
const slug = require('slug');
const { nanoid } =  require('nanoid');
const { validationResult } = require('express-validator');
const _ = require('underscore');

const getAddProducts = (req, res, next) => {

    const { item, edit } = req.query;

    if( !edit ) {

        return res.render('admin/edit-product', {
            state: {
                breadcrumb: {
                    icon: 'edit',
                    title: 'crear producto',
                    leyenda: 'Agrega tu producto al inventario'
                },
                isAuthentication: req.session.isLogguedIn
            }
        });
    }


    Product.findOne({ Prod_Slug_Url: item })
        .then(product => {

            res.render('admin/edit-product', {
                state: {
                    breadcrumb: {
                        icon: 'edit',
                        title: 'modificar producto',
                        leyenda: `estas modificando:     ${item}`
                    },
                    product,
                    isAuthentication: req.session.isLogguedIn
                }
            });
        })

}

const postAddProducts = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log({errors: errors.array()});
        return res.status(400).json({ errors: errors.array() });
    }

    const Prod_Title_Slug = slug(req.body.Prod_Title);
    const Prod_Url = `${Prod_Title_Slug}-${nanoid(10)}`; 

    const body = {
    Prod_Title: req.body.Prod_Title,
    Prod_Slug: Prod_Title_Slug,
    Prod_Slug_Url: Prod_Url,
    Prod_Price: req.body.Prod_Price,
    Prod_Images: req.body.Prod_Images,
    Prod_Videos: req.body.Prod_Videos,
    Prod_Description: req.body.Prod_Description,
    Usr_Id: req.user._id
    }

    const producto = new Product(body);

    console.log(producto);

    producto.save()
        .then(product => {
            res.status(201).json({
                success: true,
                msg: 'Se ha creado el producto',
                product
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                msg: 'No se pudo crear el producto',
                error
            })
        });

}

const getProducts = (req, res, next) => {

    Product.find()
        .then(products => {

            res.render('admin/products', {
                state: {
                    breadcrumb: {
                        icon: 'user',
                        title: 'My products',
                        leyenda: 'Show all my products in list!'
                    },
                    products,
                    isAuthentication: req.session.isLogguedIn
                }
            });
        });

}

module.exports = {
    getAddProducts,
    postAddProducts,
    getProducts
}