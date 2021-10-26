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
    importancia : Number,
    esCliente : Boolean,
    proyectos : [{type: Schema.ObjectId, ref: "Proyecto" }],
    Propietario : {type: Schema.ObjectId, ref: "Proyecto" } | undefined

});


module.exports = model('Usuario', usuarioSchema);