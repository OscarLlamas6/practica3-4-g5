const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: { type : String , required : true},
    apellido: { type : String , required : true},
    CUI: { type : String , unique : true, required : true},
    cuenta: { type : String , unique : true, required : true},
    saldo: { type : Number, required : true},
    correo: { type : String , required : true},
    password: { type : String , required : true}
});

module.exports = model('Usuario', usuarioSchema);