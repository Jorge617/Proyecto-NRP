const { Schema, model } = require('mongoose');

const requisitoSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        unique : true
    },
    prioridad: [{
        valor: Number,
        cliente: { type: Schema.ObjectId, ref: "Cliente" }      
    }],
    coste: Number 
});


module.exports = model('Requisito', requisitoSchema);