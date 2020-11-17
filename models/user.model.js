const mongoose = require('mongoose');
const _ = require('underscore');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
	Usr_Name: {
		type: String,
		required: true,
	},
	Usr_Email: {
		type: String,
		required: true,
	},
	Usr_Password: {
		type: String,
		required: true,
	},	
	Usr_Cart: {
		Cart_Items: [
			{
				Prod_Id: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				Item_Quantity: {
					type: Number,
					required: true,
				},
			},
		],
	},
});

usuarioSchema.methods.addToCart = function (product) {
	const CART_PRODUCT_INDEX = _.findIndex(this.Usr_Cart.Cart_Items, (cp) => {
		return cp.Prod_Id.toString() === product._id.toString();
	});

	let newQuantity = 1;
	const updateCartItems = [...this.Usr_Cart.Cart_Items];

	if (CART_PRODUCT_INDEX >= 0) {
		newQuantity =
			this.Usr_Cart.Cart_Items[CART_PRODUCT_INDEX].Item_Quantity + 1;
		updateCartItems[CART_PRODUCT_INDEX].Item_Quantity = newQuantity;
	} else {
		updateCartItems.push({
			Prod_Id: product._id,
			Item_Quantity: newQuantity,
		});
	}

	const updatedCart = { Cart_Items: updateCartItems };

	this.Usr_Cart = updatedCart;
	return this.save();
};

usuarioSchema.methods.removeFromCart = async function (Item_Id) {
	const updateCartItems = _.filter(this.Usr_Cart.Cart_Items, (item) => {
		return item._id.toString() !== Item_Id.toString();
	});

	this.Usr_Cart.Cart_Items = updateCartItems;
	return this.save();
};

usuarioSchema.methods.clearCart = function () {
	this.Usr_Cart = { Cart_Items: [] };
	return this.save();
};

module.exports = mongoose.model('User', usuarioSchema);
