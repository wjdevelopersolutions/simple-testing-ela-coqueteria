const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	Ord_Products: [
		{
			Cart_Prod: { type: Object, required: true },
			Cart_Prod_Quantity: { type: Number, required: true },
		},
	],
	Ord_User: {
		Usr_Name: { type: String, required: true },
		Usr_Id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	},
});

module.exports = mongoose.model('Order', orderSchema);
