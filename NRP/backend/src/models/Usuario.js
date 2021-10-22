const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    token : String,
    importancia : Number

});


module.exports = model('Usuario', usuarioSchema);