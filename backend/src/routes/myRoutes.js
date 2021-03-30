const { Router } = require('express');
const { Mongoose } = require('mongoose');
const router = Router();

router.get('/', (req, res) => {
    res.json({'Resultado': 'API AYD1: Practica 3 y 4 - Grupo 5! :D'});
});

module.exports = router; 