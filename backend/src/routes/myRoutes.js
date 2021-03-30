const { Router } = require('express');
const { Mongoose } = require('mongoose');
const Usuario = require('../models/usuario');
const Transaccion = require('../models/transaccion');
const { v4: uuidv4 } = require('uuid');
const router = Router();

router.get('/', (req, res) => {
    res.json({'Resultado': 'API AYD1: Practica 3 y 4 - Grupo 5! :D'});
});




router.post("/nuevoUsuario", async (req, res) => {

    try {

        const data = req.body;

        var cuenta = uuidv4() + "";
        cuenta = cuenta.toString();
        cuenta = cuenta.replace(/[a-zA-Z\-]/g, '').substring(0,14);
        var seguirValidando = true;

        while(seguirValidando){
            await Usuario.findOne({ cuenta: cuenta }, function (err, docs) { 
                if (err){ 
                    console.log(err)
                    res.status(404);
                    res.send({ message : err }); 
                }
                else if (docs == null) seguirValidando = false;                  
                else {
                    cuenta = uuidv4() + ""; 
                    cuenta = cuenta.toString();
                    cuenta = cuenta.replace(/[a-zA-Z\-]/g, '').substring(0,14);
            }  
            });            
        }
        
        Usuario.exists({ CUI: data.CUI }, async function (err, doc) { 
            if (err){ 
                console.log(err)
                res.status(404);
            }else {
                if (!doc){
                    await Usuario.create({
                        nombre: data.nombre,
                        apellido: data.apellido,
                        CUI: data.CUI,
                        cuenta: cuenta.toString(),
                        saldo: data.saldo,
                        correo: data.correo,
                        password: data.password
                    }); 
                    res.status(202);
                    res.json({ cuenta : cuenta });  
                } else {
                    res.status(202);
                    res.json({ message : 'Ya existe un usuario registrado con ese CUI :('});
                }
            }});
        
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send({ message : error });
    }
    
});

router.post('/login', async (req, res) => {

    try {

        const data = req.body;
        await Usuario.findOne({ cuenta: data.cuenta, password: data.password}, function (err, docs) { 
            if (err){ 
                console.log(err)
                res.status(404);
                res.send({ message : err }); 
                console.log("crendenciales incorrectas o usuario no existe :c");
            } else if (docs == null) {
                res.status(404);
                res.send({ message : "crendenciales incorrectas o usuario no existe" }); 
                console.log("crendenciales incorrectas o usuario no existe :c");
            } else{ 
                res.status(202);
                console.log("crendenciales correctas :3")
                res.json(docs);              
            } 
        });
        
    } catch (error) {
        console.log(error)
        res.status(404);
        res.send({ message : error });
        console.log("crendenciales incorrectas o usuario no existe :c");
    }

});

module.exports = router; 