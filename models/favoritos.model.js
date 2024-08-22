const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FavoritosSchema = new Schema({
  id: ObjectId,
  username: {
    type: String
  },
  producto: {
    type: String
  }
});

const FavoritosModel = mongoose.model('favoritos', FavoritosSchema)
module.exports = FavoritosModel