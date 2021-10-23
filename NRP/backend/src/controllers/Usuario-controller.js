const usuarioController = {};

const usuario = require('../models/Usuario.js');


usuarioController.registro = async (req, res) => {
    const { nombre, password, token } = req.body;
    const nuevoUsuario = new usuario({ nombre, password, token });
    console.log(nuevoUsuario)
    await nuevoUsuario.save();
    res.json({ message: `usuario dado de alta ${nombre} ` });
}

usuarioController.login = async (req, res) => {
    const { nombre, password } = req.query;
    usuarioLogeado = await usuario.findOne({ nombre });
    if (usuarioLogeado != null) {
        if (usuarioLogeado.password == password) {
            res.json({ resultado: true, id: usuarioLogeado._id });
        } else if (usuarioLogeado.password != password) {
            res.json({ resultado: false,  error: "password" });
        }
    } else {
        res.json({ resultado: false,  error: "usuario" });
    }

}


usuarioController.getUsuarios = async (req, res)=> {
    const usuarios = await usuario.find();
    res.json(usuarios);
}

usuarioController.getUsuarioByToken =  async (req, res) => {
    const token = req.params;
    const usuarioByToken = await usuario.findOne(token)
    console.log("eragr")
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




/*usuarioController.getUsuario = async (req, res)=> {
    const usuarios = await usuario.find();
    res.json(usuarios);
}*/
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




module.exports = usuarioController;