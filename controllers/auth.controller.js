const User = require('../models/user.model');

const getLogin = (req, res, next) => {
	res.render('auth/login', {
		state: {
			breadcrumb: {
				icon: 'sign-in',
				title: 'Inicio de sesion',
				leyenda: 'Accede con tu usuario y contrasena',
			},
		},
	});
};

const postLogin = (req, res, next) => {
	User.findOne({ _id: '5fae8d026d78c61ea0d2d7b3' })
		.then((user) => {
			req.session.isLogguedIn = true;
			req.session.user = user;
			req.session.save((err) => {
				console.log(err);
				res.redirect('/');
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

const postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		// console.log(err);
		res.redirect('/');
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
			isAuthentication: false,
		},
	});
};

const postSignup = (req, res, next) => {
	const {
		Usr_Name,
		Usr_Email,
		Usr_Password,
		Usr_Confirm_Password,
	} = req.body.user;

	User.findOne({ Usr_Email: req.body.Usr_Email })
		.then((userDB) => {
			if (userDB) {
				return res.status(400).json({
					success: false,
					msg: 'El correo ya existe',
				});
			}
			const user = new User({
				Usr_Name,
				Usr_Email,
				Usr_Password,
				Usr_Confirm_Password,
			});

			return user.save();
		})
		.then((result) => {
			res.json({
				success: true,
				msg: 'usuario creado',
			});
		})
		.catch((err) => {
			res.status(500).json({
				success: false,
				msg: 'error al crear el usuario',
			});
		});
};

module.exports = { getLogin, postLogin, postLogout, getSignup, postSignup };
