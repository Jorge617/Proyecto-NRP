const usuarioController = {};

const usuario = require('../models/Usuario.js');


usuarioController.registro = async (req, res)=> {
    const {nombre, password} = req.body;
    const nuevoUsuario = new usuario({nombre, password});
    await nuevoUsuario.save();
    res.json({message : `usuario dado de alta ${nombre} `});
}

usuarioController.login = async (req, res) => {
    const{nombre, password} = req.body;
    usuarioLogeado = await usuario.find({nombre});
    if(!usuarioLogeado){
        res.json('False');
    } else {
        res.json('true');       
    }
}

module.exports = usuarioController;