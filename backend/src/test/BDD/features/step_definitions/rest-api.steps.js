const assert = require("assert");
const { Given, When, Then } = require("cucumber");
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);
let restHelper = require("../../../../utils/restHelper");
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

Given('an user with account number: {string} and password: {string}', function (account, password) {

  myCredentials = { "cuenta": account, "password": password };
  this.today = JSON.parse(JSON.stringify(myCredentials));

});

Given('an user with account number: {string}', function (account) {

  myCredentials = { "cuenta": account };
  this.today = JSON.parse(JSON.stringify(myCredentials));

});

Given('a new user with credentials: {string}, {string}, {string}, {string}, {string} and {string}', function (name, lastname, CUI, balance, mail, password) {

  myCredentials = { "nombre": String(name),
                    "apellido": String(lastname),
                    "CUI": String(CUI),
                    "saldo": String(balance),
                    "correo": String(mail),
                    "password": String(password) 
                   };
  this.today = JSON.parse(JSON.stringify(myCredentials));

});

Given('an user with account number: {string} who wants to send {float} quetzales to another user with account number: {string}', function (account, amount, account2) {

  myCredentials = { "CuentaOrigen": String(account),
                    "CuentaDestino": String(account2),
                    "monto": String(amount), 
                    "descripcion": "BDD exitosa :D"
                   };
  this.today = JSON.parse(JSON.stringify(myCredentials));

});

When('I send POST request to /login', async function () {
  this.actualAnswer = await restHelper.postData(`https://infinite-harbor-77648.herokuapp.com/login`, this.today);
})

When('I send POST request to /consultarSaldo', async function () {
  this.actualAnswer = await restHelper.postData(`https://infinite-harbor-77648.herokuapp.com/consultarSaldo`, this.today);
})

When('I send POST request to /nuevoUsuario', async function () {
  this.actualAnswer = await restHelper.postData(`https://infinite-harbor-77648.herokuapp.com/nuevoUsuario`, this.today);
})

When('I send POST request to /nuevaTransaccion', async function () {
  this.actualAnswer = await restHelper.postData(`https://infinite-harbor-77648.herokuapp.com/nuevaTransaccion`, this.today);
})

Then('I get response code: {string}', async function (code) {
  assert.equal(String(this.actualAnswer.status), String(code));
});
