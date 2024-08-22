const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsuarioSchema = new Schema({
  id: ObjectId,
  nombre: {
    type: String
  },
  apellido: {
    type: String
  },
  correo: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  rol: {
    type: String
  }
});

const UsuariosModel = mongoose.model('usuarios', UsuarioSchema)
module.exports = UsuariosModel