const { Schema, model } = require('mongoose');

const clienteSchema = new Schema({
    nombre: String,
    prioridad: {
        valor: Number,
        requisito: { type: Schema.ObjectId, ref: "Requisito" }
    }
});


module.exports = model('Cliente', clienteSchema);