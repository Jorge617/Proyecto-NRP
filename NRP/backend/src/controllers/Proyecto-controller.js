const proyectoController = {};
const Proyecto = require('../models/Proyecto.js');
const proyecto = require('../models/Proyecto.js');


proyectoController.crearProyecto = async (req, res) => {
    const { nombre, fechaInicio, fechaFin, usuarios } = req.body
    const nuevoProyecto = new Proyecto({ nombre, fechaInicio, fechaFin, usuarios });
    await nuevoProyecto.save();
    res.json({ message: `proyecto dado de alta ${nombre} ` });

}


proyectoController.getProyectos = async (req, res) => {
    const proyectos = await proyecto.find();
    res.json(proyectos);
}


proyectoController.getProyecto = async (req, res) => {
    const getProyecto = await proyecto.findById(req.params.id);
    res.json(getProyecto);
}


proyectoController.deleteProyecto = async (req, res) => {
    const { id } = req.params;
    await proyecto.findByIdAndDelete(id);
    res.json('proyecto borrado');
}

proyectoController.updateProyecto = async (req, res) => {

    //PENDIENTE DE CAMBIOS

    const { nombre, fechaInicio, fechaFin, usuarios } = req.body;
    await usuario.findByIdAndUpdate(req.params.id, {
        nombre, fechaInicio, fechaFin, usuarios
    });
}


proyectoController.postUsuarios = async (req, res) => {
    var usuarios = [];
    usuarios = req.body.usuarios
    const proyect = await proyecto.findById(req.params.id);
    var aux = [];
    aux = proyect.usuarios;
    var resultado = aux.concat(usuarios)

    try {
        await proyect.updateOne({ "usuarios": resultado });
    } catch (e) {
        print(e);
    }

    res.send("Lista actualizada");
}

proyectoController.postRequisitos = async (req, res) => {
    var requisitos = [];
    requisitos = req.body.usuarios
    const proyect = await proyecto.findById(req.params.id);
    var aux = [];
    aux = proyect.requisitos;
    var resultado = aux.concat(requisitos)

    try {
        await proyect.updateOne({ "requisitos": requisitos });
    } catch (e) {
        print(e);
    }

    res.send("Lista actualizada");
}

proyectoController.getUsuarios = async (req, res) => {
    const { usuarios } = req.body
    const proyect = await proyecto.findById(req.params.id);
    res.send({ usuarios: proyect.usuarios })
}

proyectoController.getRequisitos = async (req, res) => {
    const { requisitos } = req.body
    const proyect = await proyecto.findById(req.params.id);
    res.send({ requisitos: proyect.requisitos })
}







module.exports = proyectoController;