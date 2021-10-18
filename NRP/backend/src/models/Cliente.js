const { Schema, model } = require('mongoose');

const clienteSchema = new Schema({
    nombre: {
        type : String,
        required : true,
        unique : true
    },
    
    importancia : Number
});


module.exports = model('Cliente', clienteSchema);