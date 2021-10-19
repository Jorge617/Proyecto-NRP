



async function calcularPrioridad() {

    const axios = require('axios');

    clientes = [];
    requisitos = [];
    ordenPrioridad = [];

    const resCliente = await axios.get('http://localhost:4000/clientes/')
    clientes = resCliente.data

    const resRequisito = await axios.get('http://localhost:4000/requisitos/')
    requisitos = resRequisito.data


    var suma;

    for (var i = 0; i < requisitos.length; i++) {
        suma = 0;

        for (var j = 0; j < requisitos[i].prioridad.length; j++) {
            suma += clientes.find(element => element._id == requisitos[i].prioridad[j].cliente).importancia * requisitos[i].prioridad[j].valor
        }
        ordenPrioridad.push([requisitos[i]._id,suma]);        

        ordenPrioridad.sort(function(a, b){return b-a});
        console.log(ordenPrioridad);
    }

    return ordenPrioridad;
}

module.exports = {
    'calcularPrioridad': calcularPrioridad
}


