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

    await usuario.updateMany({ $pull: { propietario: req.params.id } })
    await usuario.updateMany({ $pull: { proyectos: req.params.id } })


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

            if (!aux.includes(usuarios[i])) {
                await proyect.updateOne({ $push: { usuarios: usuarios[i] } });
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

    var usuariosProyecto = []
    usuariosProyecto = proyect.usuarios

    for (var i = 0; i < usuarios.length; i++) {
        await usuario.updateOne({ _id: { $eq: usuarios[i] } }, { $pull: { proyectos: req.params.id } })
        try {
            for (var j = 0; j < usuariosProyecto.length; j++) {
                if (String(usuariosProyecto[j].usuario) == String(usuarios[i]._id)) {

                    for (var k = 0; k < proyect.requisitos.length; k++) {
                        var aux = await requisito.findById(proyect.requisitos[k])
                        for (var t = 0; t < aux.prioridad.length; t++) {
                            

                            if (String(aux.prioridad[t].usuario) == String(usuariosProyecto[j].usuario)) {

                                var deletePrioridad = {"usuario":String(aux.prioridad[t].usuario), "valor":aux.prioridad[t].valor}
                                await aux.updateOne({ $pull: { "prioridad": deletePrioridad } });
                                aux.save()
                            }
                        }

                    }
                   await proyect.updateOne({ $pull: { "usuarios": usuariosProyecto[j] } });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    proyect.planificacion=[]

    await proyect.save()

    res.send(usuariosProyecto);
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

    proyect.planificacion=[]


    await proyect.save()

    res.send("Lista actualizada");

}

proyectoController.getUsuarios = async (req, res) => {
    const proyect = await proyecto.findById(req.params.id);
    res.send({ usuarios: proyect.usuarios })
}

proyectoController.getRequisitos = async (req, res) => {
    const proyect = await proyecto.findById(req.params.id);

    var req = []

    for (var i = 0; i < proyect.requisitos.length; i++) {
        req.push(await requisito.findById(proyect.requisitos[i]))
    }
    res.send({ requisitos: req })
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
        if ((usuariosProyecto.length == 0) && !(usuarios[i].propietario.includes(req.params.id)) || (!(aux.includes(String(usuarios[i]._id))) && !(usuarios[i].propietario.includes(req.params.id)))) {
            resultado.push(usuarios[i])
        }

    }
    res.send({ resultado })
}

proyectoController.getUsuariosInfo = async (req, res) => {
    const proyect = await proyecto.findById(req.params.id);
    var usuarios = []
    usuarios = proyect.usuarios

    var resultado = [];

    for (var i = 0; i < usuarios.length; i++) {
        resultado.push(await usuario.findById(usuarios[i].usuario))
    }

    res.send(resultado)
}


proyectoController.calcularPrioridad = async (req, res) => {
    const proyect = await proyecto.findById(req.params.id);
    proyect.planificacion=[]
    var coste = 0;
    var requisitos = []
    var ordenPrioridad = [];
    var usuarios = []
    usuarios = proyect.usuarios

    for (var i = 0; i < proyect.requisitos.length; i++) {
        requisitos.push(await requisito.findById(proyect.requisitos[i]))
    }

    for (var i = 0; i < requisitos.length; i++) {
        suma = 0;

        for (var j = 0; j < requisitos[i].prioridad.length; j++) {
            var aux = usuarios.find(element => String(element.usuario) == String(requisitos[i].prioridad[j].usuario))

            if (aux != undefined) {
                suma += aux.importancia * requisitos[i].prioridad[j].valor
            }
        }

        ordenPrioridad.push({ "importancia": suma, "idRequisito": requisitos[i]._id, "coste": requisitos[i].coste });
    }
    ordenPrioridad.sort(function (a, b) { return b.importancia - a.importancia });
    var resultado = []
    coste = 0;
    for (var i = 0; i < ordenPrioridad.length; i++) {
        if (coste + (ordenPrioridad[i].coste) <= req.query.limite) {
            var aux = await requisito.findById(ordenPrioridad[i].idRequisito)
            
            resultado.push({ "requisito": aux, "importancia": ordenPrioridad[i].importancia, "coste": ordenPrioridad[i].coste });
            proyect.planificacion.push({ "requisito": aux, "importancia": ordenPrioridad[i].importancia, "coste": ordenPrioridad[i].coste });

            coste += ordenPrioridad[i].coste
        }
    }


    proyect.save();
    res.send(resultado);
}


module.exports = proyectoController;

