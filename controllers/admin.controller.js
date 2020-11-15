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
                product: null,
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

    const { item, edit, product } = req.body;

    if (!errors.isEmpty()) {
        console.log({errors: errors.array()});
        return res.status(400).json({ errors: errors.array() });
    }

    
    if(edit) {

        return Product.findOneAndUpdate({ Prod_Slug_Url: item}, product, {new: true})
        .then(product => {
            return res.json({
                success: true,
                msg: 'producto modificado',
                Prod_Title: product.Prod_Title
            });
        })
        .catch(error => {
            return res.status(500).json({
                success: false,
                msg: 'No se pudo modificar el producto',
                error
            });
        });

    }

    const Prod_Title_Slug = slug(product.Prod_Title);
    const Prod_Url = `${Prod_Title_Slug}-${nanoid(10)}`; 

    product.Prod_Slug = Prod_Title_Slug;
    product.Prod_Slug_Url = Prod_Url;
    product.Usr_Id = req.user._id

    const producto = new Product(product);

    producto.save()
        .then(product => {

            res.json({
                success: true,
                msg: 'producto creado',
                Prod_Title: product.Prod_Title
            });
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