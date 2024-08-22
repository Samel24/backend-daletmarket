const mongoose = require('mongoose');

const MONGODB_URL = process.env.DB

mongoose.connect(MONGODB_URL)
.then(() => console.log('Se ha conectado existosamente la base de datos'))
.catch((error) => console.log('No se pudo conectar a Mongo por el siguiente error: ' + error))