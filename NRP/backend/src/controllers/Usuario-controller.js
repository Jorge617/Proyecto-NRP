const usuarioController = {};

const usuario = require('../models/Usuario.js');


usuarioController.registro = async (req, res) => {
    const { nombre, password } = req.body;
    const nuevoUsuario = new usuario({ nombre, password });
    console.log(nuevoUsuario)
    await nuevoUsuario.save();
    res.json({ message: `usuario dado de alta ${nombre} ` });
}

usuarioController.login = async (req, res) => {
    const { nombre, password } = req.body;
    usuarioLogeado = await usuario.findOne({ nombre });
    if (usuarioLogeado != null) {
        if (usuarioLogeado.password == password) {
            res.json({ resultado: true });
        } else if (usuarioLogeado.password != password) {
            res.json({ resultado: false,  error: "password" });
        }
    } else {
        res.json({ resultado: false,  error: "usuario" });
    }

}

module.exports = usuarioController;