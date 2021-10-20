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
    usuarioLogeado = await usuario.findOne({nombre});
    if(usuarioLogeado.password==password){
            res.json({resultado:true});
    } 
     else {
        res.json({resultado:false});
     }
}

module.exports = usuarioController;