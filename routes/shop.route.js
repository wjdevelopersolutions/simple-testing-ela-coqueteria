const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');


router.route('/')
    .get(shopController.getShop)

router.route('/products')
    .get(shopController.getProducts);

router.route('/products/:url')
    .get(shopController.getProductBySlugUrl);

router.route('/compare/:Prod_Slug_Url')
    .get(shopController.getCompare);

router.route('/cart')
    .get(shopController.getCart)
    .post(shopController.postCart)

router.route('/orders')
    .get(shopController.getOrders);


module.exports = router;