var assert    = require("chai").assert;
var fecha = require("../generarFecha");


describe("testeando generarFecha: ", function() {
    describe("Validando fecha: ", function() {
        it("Check the returned value using: assert.equal(value,'value'): ", function() {
        result   = fecha.generarFecha();
        assert.typeOf(result, 'string');
        });
    });
});