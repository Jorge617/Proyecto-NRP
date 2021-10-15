const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
//SETTNGS
app.set('port', process.env.PORT ||4000);

//MIDDLEWARES
app.use(cors());
app.use(express.json());
//ROUTES

app.use('/clientes', require('./routes/Clientes')); 
app.use('/requisitos', require('./routes/Requisitos'));


module.exports = app;