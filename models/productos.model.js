const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductoSchema = new Schema({
  id: ObjectId,
  nombre: {
    type: String
  },
  categoria: {
    type: String
  },
  descripcion: {
    type: String
  },
  precio: {
    type: Number
  },
  moneda: {
    type: String
  },
  imagen: {
    type: String
  },
  cantidad: {
    type: Number
  }
});

const ProductosModel = mongoose.model('productos', ProductoSchema)
module.exports = ProductosModel