const assert = require("assert");
const { Given, When, Then } = require("cucumber");
let restHelper = require("../../../../utils/restHelper");

Given('an user with account number: {string} and password: {string}', function (account, password) {

  myCredentials = { "cuenta": account, "password": password };
  this.today = JSON.parse(JSON.stringify(myCredentials));

});

When('I send POST request to /login', async function () {
  this.actualAnswer = await restHelper.postData(`http://localhost:4000/login`, this.today);
})

Then('I get response code: {string}', async function (code) {
  assert.equal(String(this.actualAnswer.status), String(code));
});