const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');

router.route('/').get(shopController.getShop);
const isAuth = require('../middlewares/is-auth');

router
	.route('/products')
	.get(shopController.getProducts)
	.delete(isAuth, shopController.deleteProduct);

router.route('/products/:url').get(shopController.getProductBySlugUrl);

router.route('/compare/:Prod_Slug_Url').get(shopController.getCompare);

router
	.route('/cart')
	.get(isAuth, shopController.getCart)
	.post(isAuth, shopController.postCart)
	.put(isAuth, shopController.putCart);

router
	.route('/orders')
	.get(isAuth, shopController.getOrders)
	.post(isAuth, shopController.postOrder);

module.exports = router;
