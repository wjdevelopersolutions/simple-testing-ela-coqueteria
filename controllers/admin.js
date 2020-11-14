const axios = require('axios');

exports.getAdmin = (req, res, next) => {

    res.render('admin/edit-product', {
        state: {
            breadcrumb: {
                icon: 'edit',
                title: 'crear producto',
                leyenda: 'Agrega tu producto al inventario'
            }
        }
    })
}

exports.getAdminProducts = (req, res, next) => {


    axios.get('http://localhost:3000/api/v1/product')
    .then(result => {
        return result.data;
    })
    .then(data => {
        res.render('admin/index', {
            state: {
                breadcrumb: {
                    icon: 'user',
                    title: 'mis productos',
                    leyenda: 'Siempre verifica la informacion de tu producto'
                },
                productos: data.result.items
            }
        })
    })
    .catch(err => {
        console.log(err);
        throw new Error(err);
    })

  
}
exports.getByIdAdmin = (req, res, next) => {}
exports.postAdmin = (req, res, next) => {}
exports.putAdmin = (req, res, next) => {}
exports.deleteAdmin = (req, res, next) => {}