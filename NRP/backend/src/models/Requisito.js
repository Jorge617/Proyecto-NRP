const { Schema, model } = require('mongoose');

const requisitoSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        unique : true
    },
    coste: Number 
});


module.exports = model('Requisito', requisitoSchema);