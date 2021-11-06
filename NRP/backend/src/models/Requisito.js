const { Schema, model } = require('mongoose');

const requisitoSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        unique : false
    },
    prioridad: [{
        usuario: { type: Schema.ObjectId, ref: "Usuario" },
        valor: Number
    }],
    coste: Number,
    descripcion : String,
    fechaInicio:String,
    fechaFin:String
});


module.exports = model('Requisito', requisitoSchema);