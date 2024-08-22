const UsuaiosModel = require('../models/usuarios.model');
const bcrypt = require('bcrypt');
const crearToken = require("./jwt/crear.js");

class UsuariosC {
    editar(usuario_nuevo, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const usuarios = await UsuaiosModel.find({username: usuario_nuevo.username}).select(
                    '_id username password rol'
                )
                let { nombre, apellido, correo, username, password, rol } = usuario_nuevo;
                if (!username || !password || !nombre || !apellido || !correo) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                console.log(usuarios)
                if (usuarios.length > 1) {
                    return reject("Ya existe el usuario")
                }
                let newPassword = await bcrypt.hash(password, 10); // Encriptamos la contraseña para guardarla en la db
                let nuevo = {
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    username: username,
                    password: newPassword,
                    rol: rol
                }
                const usuarioEditado = await UsuaiosModel.updateOne({ _id: id }, { $set: nuevo })
                if (!usuarioEditado) {
                    return reject('Hubo un error al crear el nuevo usuario')
                }
                return resolve({
                    _id: id,
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    username: username,
                    password: newPassword,
                    rol: rol
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    //metodo para crear usuarios
    crear(usuario_nuevo) {
        return new Promise(async (resolve, reject) => {
            try {
                const usuarios = await UsuaiosModel.find().select(
                    '_id username password rol'
                )
                let { nombre, apellido, correo, username, password, rol } = usuario_nuevo;
                if (!username || !password || !rol || !nombre || !apellido || !correo) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                for (let i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].username === username) {
                        return reject("Ya existe el usuario")
                    }
                }
                let newPassword = await bcrypt.hash(password, 10); // Encriptamos la contraseña para guardarla en la db
                let nuevo = {
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    username: username,
                    password: newPassword,
                    rol: rol
                }
                const usuarioCreado = await UsuaiosModel.create(nuevo)
                if (!usuarioCreado) {
                    return reject('Hubo un error al crear el nuevo usuario')
                }
                return resolve(usuarioCreado)
            } catch (error) {
                reject(error)
            }
        })
    }

    //login
    login(usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                const usuarioAcceder = await UsuaiosModel.findOne({ username: usuario.username, }); // Verificamos si existe el usuario
                if (!usuarioAcceder) {
                    return reject("El usuario no existe");
                }
                const contraseñaValida = await bcrypt.compare(
                    usuario.password,
                    usuarioAcceder.password
                ); // Comparamos las contraseñas si son iguales

                if (!contraseñaValida) {
                    return reject("La contraseña es incorrecta");
                };
                let token = crearToken({
                    id: usuarioAcceder._id,
                    username: usuarioAcceder.username,
                    rol: usuarioAcceder.rol,
                });
                resolve({
                    token: token,
                    _id: usuarioAcceder._id,
                    username: usuarioAcceder.username,
                    rol: usuarioAcceder.rol,
                    nombre: usuarioAcceder.nombre,
                    apellido: usuarioAcceder.apellido,
                    correo: usuarioAcceder.correo
                })
            } catch (error) {
                return reject(error);
            }
        });
    }
}

module.exports = new UsuariosC();