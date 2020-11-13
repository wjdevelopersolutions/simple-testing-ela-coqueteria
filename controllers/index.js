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
    })
    
}