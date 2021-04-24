const { Router } = require('express');
const { Mongoose } = require('mongoose');
const Usuario = require('../models/usuario');
const Transaccion = require('../models/transaccion');
const { v4: uuidv4 } = require('uuid');
const router = Router();
const { generarFecha } = require('../generarFecha');
const sanitizeHtml = require('sanitize-html');

router.get('/', (req, res) => {
    res.json({'Resultado': 'API AYD1: Practica 4 - Grupo 5 :D'});
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
        
        Usuario.exists({ CUI: data.CUI.toString() }, async function (err, doc) { 
            if (err){ 
                console.log(err)
                res.status(404);
            }else {
                if (!doc){
                    await Usuario.create({
                        nombre: data.nombre.toString(),
                        apellido: data.apellido.toString(),
                        CUI: data.CUI.toString(),
                        cuenta: cuenta.toString(),
                        saldo: data.saldo,
                        correo: data.correo.toString(),
                        password: data.password.toString()
                    }); 
                    res.status(202);
                    res.json({ cuenta : cuenta });  
                } else {
                    res.status(404);
                    res.json({ message : 'Ya existe un usuario registrado con ese CUI :('});
                }
            }});
        
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send({ message : error });
    }
    
});

router.post('/eliminarUsuario', async (req, res) => {
    
    try {

        const data = req.body; 

        await Usuario.findOneAndDelete({CUI: data.CUI.toString()}, function (err, docs) {
            if (err){
                console.log(err)
                res.status(404);
                res.send({ message : err }); 
                console.log("crendenciales incorrectas o usuario no existe");
            } else if (docs == null) {
                res.status(404);
                res.send({ message : "crendenciales incorrectas o usuario no existe" }); 
                console.log("crendenciales incorrectas o usuario no existe :c");
            } else{
                res.status(202);
                console.log("Usuario eliminado correctamente")
                res.send({ message : "Usuario eliminado correctamente" }); 
            }
        });
        
        
    } catch (error) {
        console.log(error)
        res.status(404);
        res.send({ message : error });
    }

  })

router.post('/login', async (req, res) => {

    try {

        const data = req.body;
        const cuentaIngresada = data.cuenta.toString();
        const contraIngresada = data.password.toString();
        await Usuario.findOne({ cuenta: cuentaIngresada, password: contraIngresada}, function (err, docs) { 
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

router.post('/nuevaTransaccion', async (req, res) => {

    try {

        const data = req.body;

        var idTransaccion = uuidv4() + "";
        idTransaccion = idTransaccion.toString();
        idTransaccion = idTransaccion.replace(/[a-zA-Z\-]/g, '').substring(0,8);
        var seguirValidando = true;

        while(seguirValidando){
            await Transaccion.findOne({ ID: idTransaccion }, function (err, docs) { 
                if (err){ 
                    console.log(err)
                    res.status(404);
                    res.send({ message : err }); 
                }
                else if (docs == null) seguirValidando = false;                  
                else {
                    idTransaccion = uuidv4() + "";
                    idTransaccion = idTransaccion.toString();
                    idTransaccion = idTransaccion.replace(/[a-zA-Z\-]/g, '').substring(0,8);
            }  
            });            
        }


        await Usuario.findOne({ cuenta: data.CuentaDestino.toString() }, async function (err, docs) { 
            if (err){ 
                console.log(err)
                res.status(404);
                res.send({ message : err }); 
            } else if (docs == null) {
                res.status(404);
                const cuentadestino = data.CuentaDestino.toString()
                res.send({ message : "La cuenta " + sanitizeHtml(cuentadestino) + " no corresponde ningun usuario." }); 
                console.log("La cuenta " + data.CuentaDestino.toString() + " no corresponde ningun usuario.");
            } else{ 

                let date = generarFecha();
                let credito = data.monto.toString();
                let debito = data.monto.toString() * (-1);
                let descripcion = data.descripcion.toString() == null || undefined ? "" : data.descripcion.toString(); 

                await Transaccion.create({
                    ID: idTransaccion,
                    CuentaOrigen: data.CuentaOrigen.toString(),
                    CuentaDestino: data.CuentaDestino.toString(),
                    monto: data.monto.toString(),
                    fecha: date,
                    descripcion: descripcion
                }); 

                await Usuario.findOneAndUpdate(
                    { cuenta: data.CuentaDestino.toString() },
                    { $inc : { saldo : credito } } 
                );

                await Usuario.findOneAndUpdate(
                    { cuenta: data.CuentaOrigen.toString() },
                    { $inc : { saldo : debito } } 
                );

                res.status(202);
                res.json({ transaccion : idTransaccion });              
            } 
        });
        
    } catch (error) {
        console.log(error)
        res.status(404);
        res.send({ message : error });
    }

});

router.post('/reporteTransaccion', async (req, res) => {

    try {

        const data = req.body;
        var debitos, creditos;


        await Usuario.findOne({ cuenta: data.cuenta.toString() }, async function (err, docs) { 

            if (err){ 
                console.log(err)
                res.status(404);
                res.send({ message : err }); 
                console.log("Usuario no existente :c");
            } else if (docs == null) {
                res.status(404);
                res.send({ message : "Usuario no existente :c" }); 
                console.log("Usuario no existente :c");
            } else{ 
                
                await Transaccion.find({ CuentaOrigen: data.cuenta}, function (err, deb) {
                    if (err){ 
                        console.log(err)
                        res.status(404);
                        res.send({ message : err }); 
                        console.log("Error al obtener transacciones :c");
                    } else{ 
                        console.log("Debitos obtenidos correctamente :D");
                        debitos = deb;
                    } 
                }); 
        
                await Transaccion.find({ CuentaDestino: data.cuenta.toString()}, function (err, cred) {
                    if (err){ 
                        console.log(err)
                        res.status(404);
                        res.send({ message : err }); 
                        console.log("Error al obtener transacciones :c");
                    } else{ 
                        console.log("Creditos obtenidos correctamente :D");
                        creditos = cred;
                    } 
                }); 

                res.status(202);
                res.json({"creditos": JSON.parse(JSON.stringify(creditos)), "debitos": JSON.parse(JSON.stringify(debitos))});
                            
            } 
        });
        
    } catch (error) {
        console.log(error)
        res.status(404);
        res.send({ message : error });
    }

});

router.post('/consultarSaldo', async (req, res) => {

    try {

        const data = req.body;
        await Usuario.findOne({ cuenta: data.cuenta.toString() }, function (err, docs) { 
            if (err){ 
                console.log(err)
                res.status(404);
                res.send({ message : err });
            } else if (docs == null) {
                res.status(404);
                res.send({ message : "Usuario no existe" }); 
                console.log("Usuario no existe :c");
            } else{            
                res.status(202);
                res.json({ saldo : JSON.parse(JSON.stringify(docs)).saldo});              
            } 
        });
        
    } catch (error) {
        console.log(error)
        res.status(404);
        res.send({ message : error });
    }

});

module.exports = router; 
