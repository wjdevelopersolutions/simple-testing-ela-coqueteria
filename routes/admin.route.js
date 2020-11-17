const express = require('express');
const router = express.Router();

const adminiController = require('../controllers/admin.controller');
const isAuth = require('../middlewares/is-auth');


router.route('/products')
    .get(isAuth, adminiController.getProducts)
    
router.route('/add-product')
    .get(isAuth, adminiController.getAddProducts)
    .post(isAuth, adminiController.postAddProducts)

module.exports = router;