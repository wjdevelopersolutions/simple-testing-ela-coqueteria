const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router
	.route('/login')
	.get(authController.getLogin)
	.post(authController.postLogin);

router.route('/logout').post(authController.postLogout);

router
	.route('/signup')
	.get(authController.getSignup)
	.post(authController.postSignup);

module.exports = router;
