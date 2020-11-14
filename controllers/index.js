const axios = require('axios');

exports.getIndex = (req, res, next) => {

    axios.get('http://localhost:3000/api/v1/product')
    .then(result => {
        return result.data;
    })
    .then(data => {
        res.render('shop/index', {
            state: {
                pageTitle: 'index page',
                breadcrumb: {
                    icon: 'home',
                    title: 'tienda',
                    leyenda: 'List of all products in stock'
                },
                productos: data.result.items
            }
        });
    })
    .catch(err => {
        console.log(err);
        throw new Error(err);
    });
    
}

exports.getIndexById = (req, res, next) => {


    axios.get(`http://localhost:3000/api/v1/product/${req.params.id}`)
    .then(result => {
        return result.data;
    })
    .then(data => {

        console.log(data.result);
        res.render('shop/detail', {
            state: {
                pageTitle: 'index page',
                breadcrumb: {
                    icon: 'eye',
                    title: 'Detalle de producto',
                    leyenda: 'Detalle del producto por el ID'
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        throw new Error(err);
    });


}

