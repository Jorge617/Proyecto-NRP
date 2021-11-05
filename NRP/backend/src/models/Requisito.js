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
    coste: Number 
});


module.exports = model('Requisito', requisitoSchema);