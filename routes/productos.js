var express = require('express');
const productosControllers = require('../controllers/productos.controllers');
const { autenticacionPorHeader } = require('../controllers/jwt/autenticacion');
var router = express.Router();

// Registrar Productos
router.post('/registrar', function (req, res, next) {
    autenticacionPorHeader(req, res, next, ['admin'])
}, function (req, res, next) {
    productosControllers.crear(req.body)
        .then((resultado) => {
            res.status(201).json({ "producto": resultado, status: 201, "mensaje": "Registrado con exito el producto" })
        })
        .catch((error) => {
            res.status(400).json({ "error": error })
        })
});

// All Productos
router.get('/all', function (req, res, next) {
    autenticacionPorHeader(req, res, next, ['admin', 'user'])
}, function (req, res, next) {
    productosControllers.all(req.body)
        .then((resultado) => {
            res.status(200).json({ "productos": resultado, status: 200, "mensaje": "Productos listados con exito" })
        })
        .catch((error) => {
            res.status(400).json({ "error": error })
        })
});

// filtrado de Productos
router.get('/filtro/:filtro', function (req, res, next) {
    autenticacionPorHeader(req, res, next, ['admin', 'user'])
}, function (req, res, next) {
    productosControllers.filtrado(req.params.filtro)
        .then((resultado) => {
            res.status(200).json({ "productos": resultado, status: 200, "mensaje": "Productos filtrados con exito" })
        })
        .catch((error) => {
            res.status(400).json({ "error": error })
        })
});

// filtrado de Productos
router.get('/buscar/:busca', function (req, res, next) {
    autenticacionPorHeader(req, res, next, ['admin', 'user'])
}, function (req, res, next) {
    productosControllers.busqueda(req.params.busca)
        .then((resultado) => {
            res.status(200).json({ "productos": resultado, status: 200, "mensaje": "Productos filtrados con exito" })
        })
        .catch((error) => {
            res.status(400).json({ "error": error })
        })
});

// Eleminar producto
router.delete('/delete/:id', function (req, res, next) {
    autenticacionPorHeader(req, res, next, ['admin'])
}, function (req, res, next) {
    productosControllers.eliminar(req.params.id)
        .then((resultado) => {
            res.status(200).json({ "producto": resultado, status: 200, "mensaje": "Producto eliminado con exito" })
        })
        .catch((error) => {
            res.status(400).json({ "error": error })
        })
});

// Editar producto
router.put('/editar/:id', function (req, res, next) {
    autenticacionPorHeader(req, res, next, ['admin'])
}, function (req, res, next) {
    productosControllers.editar(req.body, req.params.id)
        .then((resultado) => {
            res.status(201).json({ "producto": resultado, status: 201, "mensaje": "Producto editado con exito" })
        })
        .catch((error) => {
            res.status(400).json({ "error": error })
        })
});

// Vender producto
router.put('/vender/:id', function (req, res, next) {
    autenticacionPorHeader(req, res, next, ['admin', 'user'])
}, function (req, res, next) {
    productosControllers.vender(req.params.id)
        .then((resultado) => {
            res.status(201).json({ "producto": resultado, status: 201, "mensaje": "Producto Vendido con exito" })
        })
        .catch((error) => {
            res.status(400).json({ "error": error })
        })
});



module.exports = router;
