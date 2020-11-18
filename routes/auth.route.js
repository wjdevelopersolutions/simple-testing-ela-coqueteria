const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router
	.route('/login')
	.get(authController.getLogin)
	.post(authController.postLogin);

router.route('/logout').post(authController.postLogout);

router.route('/reset')
	.get(authController.getReset)
	.post(authController.postReset)

router.route('/reset/:CRYPTO_Token')
	.get(authController.getNewPassword)
	.post(authController.postNewPassword)

router
	.route('/signup')
	.get(authController.getSignup)
	.post(authController.postSignup);

module.exports = router;
