const { Schema, model } = require('mongoose');

const clienteSchema = new Schema({
    nombre: {
        type : String,
        required : true,
        unique : true
    },
    prioridad: [{
        valor: Number,
        requisito: { type: Schema.ObjectId, ref: "Requisito" }      
    }],
    importancia : Number
});


module.exports = model('Cliente', clienteSchema);