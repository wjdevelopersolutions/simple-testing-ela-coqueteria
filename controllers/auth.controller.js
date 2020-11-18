const bycript = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user.model');
const { reset } = require('nodemon');


const transporter = nodemailer.createTransport(sendgridTransport({
	auth: {
		api_key: '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'
	}
}));

const getLogin = (req, res, next) => {

	res.render('auth/login', {
		state: {
			pageTitle: 'login',
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
					msg: `500: Error de conexion con el servidor, verifica tu internet`,
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
				.then(userDB => {
					res.json({
						success: true,
						msg: 'usuario creado',
					});
					transporter.sendMail({
						to: `${user.Usr_Email}`,
						from: 'coqueteriasela@outlook.com',
						subject: 'Usuario creado exitosamente',
						html: '<h1>Te has registrado en Coqueterias ela has click <a href="http://localhost:4000/login">aqui</a> para iniciar sesion.</h1>'
					})
					.catch(err => console.log(err));
				})
			

		})
		.catch((err) => {
			res.status(500).json({
				success: false,
				msg: 'error al crear el usuario',
			});
		});
};

const getReset = (req, res, next) => {
	
	res.render('auth/reset', {
		state: {
			pageTitle: 'reset',
			breadcrumb: {
				title: 'reset password',
				icon: '',
				leyenda: ''
			}
		}
	});
}

const postReset = (req, res, next) => {

	const emailRequest = req.body.Usr_Email;
	
	crypto.randomBytes(32, (err, buffer) => {

		if(err) {
			console.log(err);
			return res.redirect('/reset')
		}

		// Token generator
		const CRYPTO_Token = buffer.toString('hex');

		// Save token in db
		User.findOne({ Usr_Email: emailRequest }).then(userDB => {
			if(!userDB) {
				req.flash('error', 'El email no existe, por favor ingresa un correo electronico valudo');
				return res.redirect('/reset');
			}
			userDB.Usr_ResetToken = CRYPTO_Token;
			userDB.Usr_ResetTokenExpiration = Date.now() + 3600000;

			// console.log( Date.now() * 3600000);

			return userDB.save()
		})
		.then(result => {
			res.json({
				success: true,
				msg: `se ha enviado un correo a ${result.Usr_Email} para reestablecer tu contrasena`
			})
			transporter.sendMail({
				to: result.Usr_Email,
				from: 'coqueteriasela@outlook.com',
				subject: 'Reestablecer tu contrasena',
				html: `
					<p>Solicitaste reestablecer tu contrasena?</p>
					<p>Click <a href="http://localhost:4000/reset/${CRYPTO_Token}"> aqui </a> para ingresar una nueva clave <p>
				`
			});
		})
		.catch(err => {
			console.log(err);
		})

	})
}

const getNewPassword = (req, res, next) => {

	const CRYPTO_Token = req.params['CRYPTO_Token'];
	
	User.findOne({ Usr_ResetToken: CRYPTO_Token, Usr_ResetTokenExpiration: { $gt: Date.now() } })
		.then(userDB => {
			res.render('auth/new-password', {
				state: {
					pageTitle: 'new password',
					breadcrumb: {
						title: 'new password',
						icon: '',
						leyenda: ''
					},
					Usr_Id: userDB._id.toString(),
					CRYPTO_Token
				}
			})
		})
		.catch(err => {
			console.log(err)
		})
}

const postNewPassword = (req, res, next) => {
	
	const { Usr_Password, Usr_Id, CRYPTO_Token } = req.body;
	let resetUser;

	User.findOne({ 
		Usr_ResetToken: CRYPTO_Token, 
		Usr_ResetTokenExpiration: { $gt: Date.now() }, 
		_id: Usr_Id
	})
	.then(async (userDB ) => {
		resetUser = userDB;
		const salt = await bycript.genSaltSync(12);
		const hashedPassword = await bycript.hashSync(Usr_Password, salt);
		return hashedPassword;
	})
	.then(hashedPassword => {
		resetUser.Usr_Password = hashedPassword;
		resetUser.Usr_ResetToken = undefined;
		resetUser.Usr_ResetTokenExpiration = undefined;
		return resetUser.save();
	})
	.then(result => {
		res.json({
			success: true,
			msg: 'contrasena reestablecida con exito'
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			success: false,
			error: {
				msg: '500: error en conexion con el servidor',
				err
			}
		})
	})

}

module.exports = { getLogin, postLogin, postLogout, getSignup, postSignup, getReset, postReset, getNewPassword, postNewPassword };
