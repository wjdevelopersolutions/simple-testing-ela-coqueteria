const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

  Prod_Title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'El nombre no debe ser mayor a 200 caracteres']
  },
  Prod_Slug: String,
  Prod_Slug_Url: String,
  Prod_Price: {
    type: Number,
    required: true
  },
  Prod_Images: {
    type: Array,
    default: [],
    required: true
  },
  Prod_Videos: {
    type: Array,
    default: []
  },
  Prod_Description: {
    type: String,
    required: true,
    maxlength: [3000, 'La descripción no debe ser mayor a 3000 caracteres']
  },
  Prod_Views: {
    type: Number,
    default: 0
  },
  Prod_Rating: {
    type: Number,
    min: [1, 'El minimo debe de ser igual o mayor a 1'],
    max: [10, 'El maximo debe no debe de ser mayor a 10'],
    default: 1
  },
  Prod_Condition: {
    type: String,
    default: 'nuevo',
    enum: [ "devoluciones de clientes", "muestras", "exceso de inventario", "probados y funcionando", "defectuoso", "utilizado", "reacondicionado", "irregulares", "nuevo"]
  },
  Prod_Avaliable: {
    type: Number,
    default: 0
  },
  Prod_Sold: {
    type: Number,
    default: 0
  },
  Prod_Location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
      // required: true
    },
    coordinates: {
      type: [Number],
      // required: true,
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  Prod_Careers: {
    type: [String],
    required: true,
    default: 'sin categoria',
    enum: [
      "moda",
      "interior",
      "producto de limpieza",
      "hombre",
      "mujer",
      "bebe",
      "sin categoria"
    ]
  },
  Prod_CreateAt: {
    type: Date,
    default: Date.now
  },
  Prod_UpdatedAt: {
    type: Date,
    default: Date.now
  },
  Prod_Inventory: {
    type: Number,
    required: true,
    default: 0
  },
  Usr_Id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

});

productSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.Prod_Id = _id;
  return object;
})

module.exports = mongoose.model('Product', productSchema); 