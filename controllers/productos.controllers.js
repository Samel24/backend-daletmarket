const ProductosModel = require('../models/productos.model.js');
const { autenticacion, autenticacionPorHeader } = require("./jwt/autenticacion.js");

class ProductosC {
    //Todos los productos
    all(producto_nuevo) {
        return new Promise(async (resolve, reject) => {
            try {
                const productos = await ProductosModel.find().select(
                    '_id nombre categoria descripcion precio moneda imagen cantidad'
                )
                return resolve(productos)
            } catch (error) {
                reject(error)
            }
        })
    }

    //Todos los productos
    filtrado(filtro) {
        return new Promise(async (resolve, reject) => {
            try {
                const productos = await ProductosModel.find({ categoria: filtro }).select(
                    `_id nombre categoria descripcion precio moneda imagen cantidad`
                )
                return resolve(productos)
            } catch (error) {
                reject(error)
            }
        })
    }

    //buscar los productos
    busqueda(buscar) {
        return new Promise(async (resolve, reject) => {
            try {
                const productos = await ProductosModel.find({ nombre: buscar }).select(
                    `_id nombre categoria descripcion precio moneda imagen cantidad`
                )
                return resolve(productos)
            } catch (error) {
                reject(error)
            }
        })
    }

    //metodo para crear usuarios
    crear(producto_nuevo) {
        return new Promise(async (resolve, reject) => {
            try {
                /*const productos = await ProductosModel.find().select(
                    '_id nombre categoria descripcion precio moneda imagen cantidad'
                )*/
                let { nombre, categoria, descripcion, precio, moneda, imagen, cantidad } = producto_nuevo;
                if (!nombre || !categoria || !descripcion || !precio || !moneda || !imagen || !cantidad) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                let nuevo = {
                    nombre: nombre,
                    categoria: categoria,
                    descripcion: descripcion,
                    precio: Number(precio),
                    moneda: moneda,
                    imagen: imagen,
                    cantidad: Number(cantidad)
                }
                const productoCreado = await ProductosModel.create(nuevo)
                if (!productoCreado) {
                    return reject('Hubo un error al crear el nuevo usuario')
                }
                return resolve(productoCreado)
            } catch (error) {
                reject(error)
            }
        })
    }

    // Eliminar Productos
    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const productoBuscado = await ProductosModel.findOne({ _id: id })

                if (!productoBuscado) {
                    return reject('El equipo no existe')
                }

                // Eliminamos el Equipo seleccionado
                const productoEliminado = await ProductosModel.findByIdAndDelete(id)

                return resolve(productoEliminado)

            } catch (error) {
                console.error('Error al eliminar el Equipo:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el Equipo',
                })
            }
        })
    }

    editar(producto, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const { nombre, categoria, descripcion, precio, moneda, imagen, cantidad } = producto
                if (!nombre || !categoria || !descripcion || !precio || !moneda || !imagen || !cantidad) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                } else {
                    console.log('hola')
                    let nuevo = {
                        _id: id,
                        nombre: nombre,
                        categoria: categoria,
                        descripcion: descripcion,
                        precio: Number(precio),
                        moneda: moneda,
                        imagen: imagen,
                        cantidad: Number(cantidad)
                    }
                    const productoEditado = await ProductosModel.updateOne({ _id: id }, { $set: nuevo })

                    if (!productoEditado) {
                        return reject('Hubo un error al editar el Equipos')
                    }

                    return resolve({
                        nombre: nombre,
                        categoria: categoria,
                        descripcion: descripcion,
                        precio: Number(precio),
                        moneda: moneda,
                        imagen: imagen,
                        cantidad: Number(cantidad)
                    })
                }
            } catch (error) {
                console.error('Error al editar el Equipo:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al editar el Equipo',
                })
            }
        })
    }

    vender(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const venta = await ProductosModel.findOne({ _id: id }).select(
                    `_id nombre categoria descripcion precio moneda imagen cantidad`
                )
                venta.cantidad = venta.cantidad - 1
                console.log('aqui')
                const productoEditado = await ProductosModel.updateOne({ _id: id }, { $set: venta })

                if (!productoEditado) {
                    return reject('Hubo un error al editar el Equipos')
                }

                return resolve("Vendido")

            } catch (error) {
                console.error('Error al editar el Equipo:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al editar el Equipo',
                })
            }
        })
    }
}

module.exports = new ProductosC();