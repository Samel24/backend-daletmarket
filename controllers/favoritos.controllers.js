const FavoritosModel = require('../models/favoritos.model.js');

class FavoritosC {
    //Todos los favoritos
    all() {
        return new Promise(async (resolve, reject) => {
            try {
                const favoritos = await FavoritosModel.find().select(
                    '_id username producto'
                )
                return resolve(favoritos)
            } catch (error) {
                reject(error)
            }
        })
    }

    //anadir y elimnar los favoritos
    createDelete(user, producto) {
        return new Promise(async (resolve, reject) => {
            try {
                const favoritos = await FavoritosModel.findOne({ username: user, producto: producto }).select(
                    '_id username producto'
                )
                if (!favoritos) {
                    let nuevo = {
                        username: user, 
                        producto: producto
                    }
                    await FavoritosModel.create(nuevo)
                    return resolve("Anadido a Favorito el producto")
                }
                await FavoritosModel.findOneAndDelete(favoritos._id)
                return resolve('Eliminado de Favorito el producto')
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new FavoritosC();