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
    esCliente : Boolean,
    proyectos : [{type: Schema.ObjectId, ref: "Proyecto" }],
    propietario : [{type: Schema.ObjectId, ref: "Proyecto" }]

});


module.exports = model('Usuario', usuarioSchema);