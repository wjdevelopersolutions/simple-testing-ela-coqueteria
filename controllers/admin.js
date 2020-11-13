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
exports.getByIdAdmin = (req, res, next) => {}
exports.postAdmin = (req, res, next) => {}
exports.putAdmin = (req, res, next) => {}
exports.deleteAdmin = (req, res, next) => {}