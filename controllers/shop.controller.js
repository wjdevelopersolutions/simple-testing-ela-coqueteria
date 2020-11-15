const Product = require('../models/product.model');

const getShop = (req, res, next) => {

    Product.find()
        .then(products => {

            res.render('shop/index', {
                state: {
                    pageTitle: 'shop',
                    breadcrumb: {
                        title: 'shop',
                        icon: 'shopping bag',
                        leyenda: 'Shopping now!'
                    },
                    isAuthentication: req.session.isLogguedIn,
                    products
                }
            })
        });

}

const getProducts = (req, res, next) => {

    Product.find()
        .then(products => {

            res.render('shop/products', {
                state: {
                    pageTitle: 'products',
                    breadcrumb: {
                        title: 'products',
                        icon: 'boxes',
                        leyenda: 'Show all products!'
                    },
                    isAuthentication: req.session.isLogguedIn,
                    products
                }
            })
        });

}

const getProductBySlugUrl = (req, res, next) => {

    Product.findOne({ Prod_Slug_Url:  req.params.url })
        .then(product => {

            res.render('shop/detail', {
                state: {
                    pageTitle: 'Product detail',
                    breadcrumb: {
                        title: 'Product detail',
                        icon: 'eye',
                        leyenda: 'Show product detail!'
                    },
                    isAuthentication: req.session.isLogguedIn,
                    product

                }
            })
        });

}

const getCompare = (req, res, next) => {

    res.render('shop/compare', {
        state: {
            pageTitle: 'compare',
            breadcrumb: {
                title: 'compare items',
                icon: 'tasks',
                leyenda: 'compare you item with others once!'
            },
            isAuthentication: req.session.isLogguedIn,
        }
    })
}

const getCart = (req, res, next) => {

    req.user
        .populate('Usr_Cart.Cart_Items.Prod_Id')
        .execPopulate()
        .then(user => {

            // console.log(user);
            res.render('shop/cart', {
                state: {
                    pageTitle: 'cart',
                    breadcrumb: {
                        title: 'my cart',
                        icon: 'shop',
                        leyenda: 'My shopping cart!'
                    },
                    products: user.Usr_Cart.Cart_Items,
                    isAuthentication: req.session.isLogguedIn,
                }
            });
        });

}

const postCart = (req, res, next) => {

    Product.findOne({ Prod_Slug_Url: req.body.Prod_Slug_Url })
        .then(product => {
            req.user.addToCart(product);
            return product;
        })
        .then(productInCart => {
            res.json({
                success: true,
                Prod_Title: productInCart.Prod_Title 
            });
        });
}

const deleteCart = (req, res, next) => {

    console.log(req.body);

}

const getOrders = (req, res, next) => {

    res.render('shop/orders', {
        state: {
            pageTitle: 'order',
            breadcrumb: {
                title: 'orders',
                icon: 'dolly',
                leyenda: 'My order list!'
            },
            isAuthentication: req.session.isLogguedIn,
        }
    })
}

module.exports = {

    getShop,
    getProducts,
    getProductBySlugUrl,
    getCompare,
    getCart,
    postCart,
    deleteCart,
    getOrders
}