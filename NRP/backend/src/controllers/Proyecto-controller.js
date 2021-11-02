const proyectoController = {};
const proyecto = require('../models/Proyecto.js');
const usuario = require('../models/Usuario.js');
const requisito = require('../models/Requisito.js');

proyectoController.crearProyecto = async (req, res) => {
    const { nombre, fechaInicio, fechaFin, usuarios, descripcion, idUsuario } = req.body
    const nuevoProyecto = new proyecto({ nombre, fechaInicio, fechaFin, usuarios, descripcion });
    await nuevoProyecto.save();

    await usuario.updateOne({ _id: { $eq: idUsuario } }, { $push: { propietario: nuevoProyecto._id } })

    res.json({ message: `proyecto dado de alta ${nombre} ` });

}

proyectoController.deleteAll = async (req, res) => {
    await proyecto.remove({})
    res.json("Delete completado");

}


proyectoController.getProyectos = async (req, res) => {
    const proyectos = await proyecto.find();
    res.json({ proyectos });
}


proyectoController.getProyecto = async (req, res) => {
    const getProyecto = await proyecto.findById(req.params.id);
    res.json(getProyecto);
}


proyectoController.deleteProyecto = async (req, res) => {
    const { id } = req.params;

    const getProyecto = await proyecto.findById(req.params.id);
    var usuarios = getProyecto.usuarios
    for (var i = 0; i < usuarios.length; i++) {
        await usuario.updateOne({ _id: { $eq: usuarios[i] } }, { $pull: { propietario: req.params.id } })
        await usuario.updateOne({ _id: { $eq: usuarios[i] } }, { $pull: { proyectos: id } })
    }


    await proyecto.findByIdAndDelete(id);
    res.json('proyecto borrado');
}

proyectoController.updateProyecto = async (req, res) => {

    //PENDIENTE DE CAMBIOS

    const { nombre, fechaInicio, fechaFin, descripcion } = req.body;
    await usuario.findByIdAndUpdate(req.params.id, {
        nombre, fechaInicio, fechaFin, usuarios, descripcion
    });
}


proyectoController.postUsuarios = async (req, res) => {
    var usuarios = [];
    usuarios = req.body.usuarios

    for (var i = 0; i < usuarios.length; i++) {
        await usuario.updateOne({ _id: { $eq: usuarios[i].usuario } }, { $push: { proyectos: req.params.id } })

    }

    const proyect = await proyecto.findById(req.params.id);
    var aux = [];
    aux = proyect.usuarios;
    var resultado = []
    try {
        for (var i = 0; i < usuarios.length; i++) {

            if(!aux.includes(usuarios[i])){
                await proyect.updateOne({ $push:{usuarios: usuarios[i]}});
            }

        }

        
    } catch (e) {
        console.log(e);
    }

    res.send(resultado);
}



proyectoController.deleteUsuarios = async (req, res) => {
    var usuarios = [];
    usuarios = req.body.usuarios
    const proyect = await proyecto.findById(req.params.id);


    for (var i = 0; i < usuarios.length; i++) {
        await usuario.updateOne({ _id: { $eq: usuarios[i].usuario } }, { $pull: { proyectos: req.params.id } })
        try {

            await proyect.updateOne({ $pull: { "usuarios": usuarios[i] } });
        } catch (e) {
            console.log(e);
        }
    }


    await proyect.save()

    res.send("Lista actualizada");
}


proyectoController.updateUsuarios = async (req, res) => {
    var usuarios = [];
    usuarios = req.body.usuarios
    const proyect = await proyecto.findById(req.params.id);


    for (var i = 0; i < usuarios.length; i++) {
        await usuario.updateOne({ _id: { $eq: usuarios[i] } }, { $set: { proyectos: req.params.id } })
        proyect.usuarios.pull(usuarios[i])
    }


    await proyect.save()

    res.send("Lista actualizada");
}

proyectoController.postRequisitos = async (req, res) => {
    var requisitos = [];
    requisitos = req.body.requisitos
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

proyectoController.deleteRequisitos = async (req, res) => {
    var requisitos = [];
    requisitos = req.body.requisitos
    const proyect = await proyecto.findById(req.params.id);


    for (var i = 0; i < requisitos.length; i++) {
        await requisito.updateOne({ _id: { $eq: requisitos[i] } }, { $pull: { proyectos: req.params.id } })
        proyect.requisitos.pull(requisitos[i])
    }


    await proyect.save()

    res.send("Lista actualizada");
}

proyectoController.getUsuarios = async (req, res) => {
    const proyect = await proyecto.findById(req.params.id);
    res.send({ usuarios: proyect.usuarios })
}

proyectoController.getRequisitos = async (req, res) => {
    const proyect = await proyecto.findById(req.params.id);
    res.send({ requisitos: proyect.requisitos })
}


proyectoController.getUsuariosDisponibles = async (req, res) => {
    const proyect = await proyecto.findById(req.params.id);
    var usuarios = []
    var usuariosProyecto = []
    var resultado = []
    usuariosProyecto = proyect.usuarios
    usuarios = await usuario.find();
    var aux = []

    for (var i = 0; i < usuariosProyecto.length; i++) {
        aux.push(String(usuariosProyecto[i].usuario))
    }
    for (var i = 0; i < usuarios.length; i++) {
        if ((usuariosProyecto.length == 0) &&!(usuarios[i].propietario.includes(req.params.id)) || (!(aux.includes(String(usuarios[i]._id))) && !(usuarios[i].propietario.includes(req.params.id)))) {
            resultado.push(usuarios[i])
        }

    }
    res.send({ resultado })
}



module.exports = proyectoController;