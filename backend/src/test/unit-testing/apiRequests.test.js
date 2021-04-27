let { app } = require('../../../index');
const { main } = require('../../../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

describe('Testing API REST', function(){  

        describe('login as a user: ',()=>{
        it('should login', (done) => {
        chai.request(app)
        .post('/login')
        .send({ cuenta: "37747947969500", password: "123456789"})
        .end( function(err,res){
            if (err){
                console.log(err);
            } else {
                console.log(res.body)
                expect(res).to.have.status(202);
                done();
            }
        });
        });
        });

        describe('login as a user: ',()=>{
            it(`Shouldn't login`, (done) => {
            chai.request(app)
            .post('/login')
            .send({ cuenta: "37747947969500", password: "123456781"})
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(404);
                    done();
                }
            });
            });
        });

        describe('Register new user: ',()=>{
            it(`Should register a new user`, (done) => {
            chai.request(app)
            .post('/nuevoUsuario')
            .send({
                nombre: "Usuario",
                apellido: "Prueba",
                CUI: "2448618884917871",
                saldo: 175000,
                correo: "usuario@gmail.com",
                password: "123456781"
            })
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(202);
                    done();
                }
            });
            });
        });

        describe('Register new user: ',()=>{
            it(`Shouldn't register a new user`, (done) => {
            chai.request(app)
            .post('/nuevoUsuario')
            .send({
                nombre: "Usuario",
                apellido: "Prueba 2",
                CUI: "3448688500106",
                saldo: 175000,
                correo: "usuario2@gmail.com",
                password: "123456781"
            })
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(404);
                    done();
                }
            });
            });
        });

        describe('Get profile: ',()=>{
            it('should get profile', (done) => {
            chai.request(app)
            .post('/login')
            .send({ cuenta: "05522194828065", password: "123456789"})
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(202);
                    done();
                }
            });
            });
        });
        
        describe('Get profile: ',()=>{
            it(`Shouldn't get profile`, (done) => {
            chai.request(app)
            .post('/login')
            .send({ cuenta: "37747947969500", password: "123456781"})
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(404);
                    done();
                }
            });
            });
        });

        describe('Check balance: ',()=>{
            it('Should get user balance', (done) => {
            chai.request(app)
            .post('/consultarSaldo')
            .send({ cuenta: "37747947969500"})
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(202);
                    done();
                }
            });
            });
        });
    
        describe('Check balance: ',()=>{
            it(`Shouldn't get user balance`, (done) => {
            chai.request(app)
            .post('/consultarSaldo')
            .send({ cuenta: "3774794796951155"})
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(404);
                    done();
                }
            });
            });
        });
        
        describe('New transaction: ',()=>{
            it('Should register a new transaction', (done) => {
            chai.request(app)
            .post('/nuevaTransaccion')
            .send({ 
                CuentaOrigen:"37747947969500",
                CuentaDestino:"05522194828065",
                monto: 1000, 
                descripcion: "Transaccion exitosa :D"
            })
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(202);
                    done();
                }
            });
            });
        });
    
        describe('New transaction: ',()=>{
            it(`Shouldn't register a new transaction`, (done) => {
            chai.request(app)
            .post('/nuevaTransaccion')
            .send({ 
                CuentaOrigen:"37747947969500",
                CuentaDestino:"055221948280621",
                monto: 1000
            })
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(404);
                    done();
                }
            });
            });
        });

        describe('Get transactions report: ',()=>{
            it('Should get user transactions report', () => {
            chai.request(app)
            .post('/reporteTransaccion')
            .send({ cuenta: "37747947969500"})
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log("Se ha obtenido el reporte de transacciones exitosamente.")
                    expect(res).to.have.status(202);
                }
            });
            });
        });
        
        describe('Get transactions report: ',()=>{
            it(`Shouldn't get user transactions report`, () => {
            chai.request(app)
            .post('/reporteTransaccion')
            .send({ cuenta: "37747947969501"})
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log("Error al obtener reporte de transacciones exitosamente.")
                    expect(res).to.have.status(404);
                }
            });
            });
        });

});