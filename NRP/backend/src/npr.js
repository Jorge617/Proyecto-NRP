const axios = require('axios');

clientes= [];
requisitos= [];


async function main(){
    const resCliente = await axios.get('http://localhost:4000/clientes/')
    clientes= resCliente.data

    const resRequisito = await axios.get('http://localhost:4000/requisitos/')
    requisitos= resRequisito.data


    var suma = 0;

   for(var i = 0; i < requisitos.length; i++){
       for(var j = 0; j < requisitos[i].prioridad.length; j++){
       suma += clientes.find(element => element._id == requisitos[i].prioridad[j].cliente).importancia * requisitos[i].prioridad[j].valor
        
        }
    }

    console.log(suma);
}



main();
