const { Schema, model } = require('mongoose');

const ProyectoSchema = new Schema({
    nombre : String,
    requisitos : [{ type: Schema.ObjectId, ref: "Requisito" }],
    fechaInicio : String,
    fechaFin : String,
    usuarios : [{usuario: {type: Schema.ObjectId, ref: "Usuario"}, importancia: Number }],
    descripcion : String,
    planificacion : [],
    esfuerzoMax : Number,
    satisfaccionMax : Number
});


module.exports = model('Proyecto', ProyectoSchema);