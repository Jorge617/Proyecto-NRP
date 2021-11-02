const usuarioController = {};

const usuario = require('../models/Usuario.js');
const proyecto = require('../models/Proyecto.js')

usuarioController.registro = async (req, res) => {
    const { nombre, password, token } = req.body;
    const importancia = 0;
    const esCliente = false;
    const nuevoUsuario = new usuario({ nombre, password, token, importancia, esCliente });
    await nuevoUsuario.save();
    res.json({ message: `usuario dado de alta ${nombre} ` });
}

usuarioController.login = async (req, res) => {
    const { nombre, password } = req.query;
    usuarioLogeado = await usuario.findOne({ nombre });
    if (usuarioLogeado != null) {
        if (usuarioLogeado.password == password) {
            res.json({ resultado: true, usuario: usuarioLogeado });
        } else if (usuarioLogeado.password != password) {
            res.json({ resultado: false,  error: "password" });
        }
    } else {
        res.json({ resultado: false,  error: "usuario" });
    }

}


usuarioController.getUsuarios = async (req, res)=> {
    const usuarios = await usuario.find();
    res.json({usuarios});
}

usuarioController.getUsuarioByToken =  async (req, res) => {
    const token = req.params;
    const usuarioByToken = await usuario.findOne(token);
    res.json({usuarioByToken});
}

usuarioController.getToken =  async (req, res) => {
    const tokenUsuario = await usuario.findById(req.params.id);
    res.json({token:tokenUsuario.token});
}


usuarioController.updateToken = async (req, res) => {
    const {token} = req.body;
    await usuario.findByIdAndUpdate(req.params.id, {
       token
    });
    res.json('Usuario Updated');
}


usuarioController.getUsuario = async (req, res)=> {
    const getusuario = await usuario.findById(req.params.id);
    res.json(getusuario);
}

usuarioController.borrarUsuario = async (req, res) => {
    const { id } = req.params;
    await usuario.findByIdAndDelete(id);
    res.json('usuario borrado');
}

usuarioController.updateUsuario  = async (req, res) => {
    
    const {nombre, password, token, importancia, esCliente} = req.body;

    await usuario.findByIdAndUpdate(req.params.id, {
        nombre,  password, token, importancia, esCliente
    });
    res.json('usuario Updated');
}

usuarioController.getProyectos = async (req, res)=> {
  
    const getusuario = await usuario.findById(req.params.id);
    var lista = getusuario.proyectos;
    var resultado = []
    for(var i = 0; i < lista.length; i++){
       resultado.push(await proyecto.findById(lista[i]))
    }

    res.json(resultado);
}

usuarioController.deleteAll = async (req, res) => {
    await usuario.remove({})
    res.json("Delete completado");

}



usuarioController.getProyectosPropietario = async (req, res)=> {
    const getusuario = await usuario.findById(req.params.id);
    var lista = getusuario.propietario;
    var resultado = []
    for(var i = 0; i < lista.length; i++){
       await resultado.push(await proyecto.findById(lista[i]))
    }
    res.json({proyectos:resultado});
}


module.exports = usuarioController;