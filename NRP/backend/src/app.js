const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

//SETTNGS
app.set('port', process.env.PORT || 4000);

//MIDDLEWARES
app.use(cors());
app.use(express.json());
//ROUTES

app.use('/requisitos', require('./routes/Requisitos'));
app.use('/usuarios', require('./routes/Usuarios'));
app.use('/tokens', require('./routes/Tokens'));



module.exports = app;