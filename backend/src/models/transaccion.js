const { Schema, model } = require('mongoose');

const transaccionSchema = new Schema({
    ID: { type : String , unique : true, required : true},
    CuentaOrigen: { type : String , required : true},
    CuentaDestino: { type : String , required : true},
    monto: { type : Number , required : true},
    fecha: { type : String , required : true},
    descripcion: { type: String }
});

module.exports = model('Transaccion', transaccionSchema);