const Product = require('../models/product.model');
const Order = require('../models/order.model');

const getShop = (req, res, next) => {
	Product.find().then((products) => {
		res.render('shop/index', {
			state: {
				pageTitle: 'shop',
				breadcrumb: {
					title: 'shop',
					icon: 'shopping bag',
					leyenda: 'Shopping now!',
				},
				products
			},
		});
	});
};

const getProducts = (req, res, next) => {
	Product.find().then((products) => {
		res.render('shop/products', {
			state: {
				pageTitle: 'products',
				breadcrumb: {
					title: 'products',
					icon: 'boxes',
					leyenda: 'Show all products!',
				},
				products
			},
		});
	});
};

const getProductBySlugUrl = (req, res, next) => {

	Product.findOne({
		Prod_Slug_Url: req.params.url,
	}).then((product) => {
		res.render('shop/detail', {
			state: {
				pageTitle: 'Product detail',
				breadcrumb: {
					title: 'Product detail',
					icon: 'eye',
					leyenda: 'Show product detail!',
				},
				product
			},
		});
	});
};

const deleteProduct = (req, res, next) => {

	// protected route to private
	if(!req.session.isLogguedIn) {
		return res.redirect('/login');
	};

	Product.findOneAndDelete(req.query.Prod_Id)
		.then((product) => {
			console.log('producto eliminado');
			res.json({
				success: true,
				msg: 'producto eliminado',
				Prod_Id: product.Prod_Title,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json({
				success: false,
				msg: 'No se pudo eliminar el producto',
			});
		});
};

const getCompare = (req, res, next) => {
	res.render('shop/compare', {
		state: {
			pageTitle: 'compare',
			breadcrumb: {
				title: 'compare items',
				icon: 'tasks',
				leyenda: 'compare you item with others once!',
			}
		},
	});
};

const getCart = (req, res, next) => {

	req.user
		.populate('Usr_Cart.Cart_Items.Prod_Id')
		.execPopulate()
		.then((user) => {
			// console.log(user);
			res.render('shop/cart', {
				state: {
					pageTitle: 'cart',
					breadcrumb: {
						title: 'my cart',
						icon: 'shop',
						leyenda: 'My shopping cart!',
					},
					products: user.Usr_Cart.Cart_Items
				},
			});
		});
};

const postCart = (req, res, next) => {

	Product.findOne({
		Prod_Slug_Url: req.body.Prod_Slug_Url,
	})
		.then((product) => {
			req.user.addToCart(product);
			return product;
		})
		.then((productInCart) => {
			res.json({
				success: true,
				msg: 'agregado al carrito',
				Prod_Title: productInCart.Prod_Title,
			});
		});
};

const putCart = (req, res, next) => {

	req.user
		.removeFromCart(req.body.Prod_Id)
		.then((product) => {
			res.json({
				success: true,
				msg: 'producto eliminado',
			});
		})
		.catch((error) => {
			res.json({
				success: false,
				msg: 'No se pudo eliminar el producto',
			});
		});
};

const getOrders = (req, res, next) => {

	Order.find({ 'Ord_User.Usr_Id': req.session.user._id }).then((orders) => {
		res.render('shop/orders', {
			state: {
				pageTitle: 'order',
				breadcrumb: {
					title: 'orders',
					icon: 'dolly',
					leyenda: 'My order list!',
				},
				orders
			},
		});
	});
};

const postOrder = (req, res, next) => {

	req.user
		.populate('Usr_Cart.Cart_Items.Prod_Id')
		.execPopulate()
		.then((user) => {
			const products = user.Usr_Cart.Cart_Items.map((i) => {
				return {
					Cart_Prod: { ...i.Prod_Id._doc },
					Cart_Prod_Quantity: i.Item_Quantity,
				};
			});
			const order = new Order({
				Ord_Products: products,
				Ord_User: {
					Usr_Email: req.user.Usr_Email,
					Usr_Id: req.user._id,
				},
			});
			return order.save();
		})
		.then((result) => {
			// Clear cart
			req.user
				.clearCart()
				.then(() => {
					res.json({
						success: true,
						msg: 'Se ha creado la orden',
						order_id: result._id,
					});
				})
				.catch((err) => {
					return res.status(500).json({
						success: false,
						msg: 'Error al limpiar carrito de compras',
						err,
					});
				});
		})
		.catch((err) => {
			res.status(500).json({
				success: false,
				msg: 'No se pudo crear la orden',
				err,
			});
		});

	// console.log(order);
};

module.exports = {
	getShop,
	getProducts,
	getProductBySlugUrl,
	deleteProduct,
	getCompare,
	getCart,
	postCart,
	putCart,
	getOrders,
	postOrder,
};
