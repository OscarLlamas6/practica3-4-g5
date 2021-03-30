const { Schema, model } = require('mongoose');

const transaccionSchema = new Schema({
    CuentaOrigen: { type : String , required : true},
    CuentaDestino: { type : String , required : true},
    monto: { type : String , required : true},
    fecha: { type : String , required : true}
});

module.exports = model('Transaccion', transaccionSchema);