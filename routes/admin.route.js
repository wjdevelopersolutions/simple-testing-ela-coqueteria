const express = require('express');
const router = express.Router();

const adminiController = require('../controllers/admin.controller');


router.route('/products')
    .get(adminiController.getProducts)
    
router.route('/add-product')
    .get(adminiController.getAddProducts)
    .post(adminiController.postAddProducts)

module.exports = router;