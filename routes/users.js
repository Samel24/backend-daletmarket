var express = require('express');
const usuariosControllers = require('../controllers/usuarios.controllers');
var router = express.Router();

// Registrar Usuarios
router.post('/registrar', function (req, res, next) {
  usuariosControllers.crear(req.body)
    .then((resultado) => {
      res.status(201).json({"usuario": resultado, status: 201, "mensaje": "Registrado con exito el usuario"})
    })
    .catch((error) => {
      res.status(400).json({ "error": error })
    })
});

// Registrar Usuarios
router.put('/editar/:id', function (req, res, next) {
  usuariosControllers.editar(req.body, req.params.id)
    .then((resultado) => {
      res.status(201).json({"usuario": resultado, status: 201, "mensaje": "Editado con exito el Perfil"})
    })
    .catch((error) => {
      res.status(400).json({ "error": error })
    })
});

// Login Usuarios
router.post('/login', function (req, res, next) {
  usuariosControllers.login(req.body)
    .then((resultado) => {
      res.status(201).json({"token": resultado.token, user: resultado, status: 200, "mensaje": "Has iniciado sesion exitosamente"})
    })
    .catch((error) => {
      res.status(400).json({ "error": error })
    })
});

module.exports = router;
