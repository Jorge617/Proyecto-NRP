const { Schema, model } = require('mongoose');

const ProyectoSchema = new Schema({
    nombre : String,
    requisitos : [{ type: Schema.ObjectId, ref: "Requisito" }],
    fechaInicio : String,
    fechaFin : String,
    usuarios : [{type: Schema.ObjectId, ref: "Usuario" }],
    descripcion : String
});


module.exports = model('Proyecto', ProyectoSchema);