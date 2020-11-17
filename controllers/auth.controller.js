const User = require('../models/user.model');
const bycript = require('bcryptjs');

const getLogin = (req, res, next) => {

	res.render('auth/login', {
		state: {
			breadcrumb: {
				icon: 'sign-in',
				title: 'Inicio de sesion',
				leyenda: 'Accede con tu usuario y contrasena',
			}
		},
	});

};

const postLogin = (req, res, next) => {

	const { Usr_Email, Usr_Password } = req.body.user;

	User.findOne({ Usr_Email: Usr_Email })
		.then((user) => {
			if(!user){	
				return res.status(404).json({
					success: false,
					msg: 'el email es invalido'
				});
			}
				
			bycript.compare(Usr_Password, user.Usr_Password)
				.then((doMath) => {

					if(!doMath) {
						return res.status(404).json({
							success: false,
							msg: 'la contrasena es invalida'
						});
					}
					
					req.session.isLoggedIn = true;
					req.session.user = user;
					req.session.save((err) => {
						console.log(err);
						res.json({
							success: true,
							msg: 'inicio exitoso'
						})
					});
					
				})
				.catch((err) => {
					console.log(`No se puede valiar la contrasena: ${err}`);
					res.status(500).json({
						success: false,
						error: {
							msg: `500: internal server error`,
							err
						}
					});
				});
		})
		.catch(err => {
			console.log(`error 500: internal server error: ${err}`);
			res.status(500).json({
				success: false,
				error: {
					msg: `500: internal server error`,
					err
				}
			});
		});

};

const postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		res.json({
			success: true,
			msg: 'se ha cerrado la sesion'
		})
	});
};

const getSignup = (req, res, next) => {
	res.render('auth/signup', {
		state: {
			pageTitle: 'signup',
			breadcrumb: {
				icon: 'sign-in',
				title: 'Inicio de sesion',
				leyenda: 'Accede con tu usuario y contrasena',
			},
			isAuthenticated: false,
			csrfToken: req.csrfToken()
		},
	});
};

const postSignup = (req, res, next) => {

	const {
		Usr_Name,
		Usr_Email,
		Usr_Password,
	} = req.body.user;

	User.findOne({ Usr_Email })
		.then( async (userDB) => {

			if (userDB) {
				return res.status(400).json({
					success: false,
					msg: 'El correo ya existe',
				});
			}

			const salt = await bycript.genSaltSync(12);

			const hashedPassword = await bycript.hashSync(Usr_Password, salt)

			const user = new User({
				Usr_Name,
				Usr_Email,
				Usr_Password: hashedPassword
			});
			
			user.save()
				.then(() => {
					res.json({
						success: true,
						msg: 'usuario creado',
					});
				})
			

		})
		.catch((err) => {
			res.status(500).json({
				success: false,
				msg: 'error al crear el usuario',
			});
		});
};

module.exports = { getLogin, postLogin, postLogout, getSignup, postSignup };
