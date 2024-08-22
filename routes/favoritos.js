var express = require('express');
const favoritosControllers = require('../controllers/favoritos.controllers');
const { autenticacionPorHeader } = require('../controllers/jwt/autenticacion');
var router = express.Router();

// All Productos
router.get('/all', function (req, res, next) {
    autenticacionPorHeader(req, res, next, ['admin', 'user'])
}, function (req, res, next) {
    favoritosControllers.all()
        .then((resultado) => {
            res.status(200).json({ "favoritos": resultado, status: 200, "mensaje": "Favoritos listados con exito" })
        })
        .catch((error) => {
            res.status(400).json({ "error": error })
        })
});

// Registrar Productos
router.post('/registrar/:user/:producto', function (req, res, next) {
    autenticacionPorHeader(req, res, next, ['admin', 'user'])
}, function (req, res, next) {
    favoritosControllers.createDelete(req.params.user, req.params.producto)
        .then((resultado) => {
            res.status(200).json({ status: 200, "mensaje": resultado })
        })
        .catch((error) => {
            res.status(400).json({ "error": error })
        })
});

module.exports = router;