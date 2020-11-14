
const getLogin = (req, res, next) => {

    res.render('auth/login', {
        state: {
            breadcrumb: {
                icon: 'sign-in',
                title: 'Inicio de sesion',
                leyenda: 'Accede con tu usuario y contrasena'
            }
        }
    })
}

const postLogin = (req, res, next) => {

    req.session.isLogguedIn = true;
    res.redirect('/');
}

const postLogout = (req, res, next) => {

    req.session.destroy(err => {

        console.log(err);
        res.redirect('/');
    })
}


module.exports = { getLogin, postLogin, postLogout }