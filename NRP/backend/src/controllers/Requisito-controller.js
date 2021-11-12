const requisitoController = {};

const requisito = require('../models/Requisito.js');
const usuario = require('../models/Usuario.js')
const proyecto = require('../models/Proyecto.js')
requisitoController.getRequisitos = async (req, res)=> {
    const requisitos = await requisito.find();
    res.json(requisitos);
}
requisitoController.getRequisito = async (req, res)=> {
    const getrequisito = await requisito.findById(req.params.id);
    res.json(getrequisito);
}
requisitoController.crearRequisito = async (req, res)=> {
    const {nombre, prioridad, coste, idProyecto, descripcion, fechaInicio, fechaFin} = req.body;
    const nuevoRequisito = new requisito({nombre, prioridad, coste, descripcion, fechaInicio, fechaFin});
    await nuevoRequisito.save();

    await proyecto.updateOne({ _id: { $eq: idProyecto } }, { $push: { requisitos: nuevoRequisito._id } })

    
    res.json({message : `Requisito dado de alta ${nombre} ${prioridad} ${coste} `});
}
requisitoController.borrarRequisito = async (req, res) => {
    const { id } = req.params;
    const idProyecto = req.query.idProyecto
    const nuevoRequisito = await requisito.findById(id);
    await proyecto.updateOne({ _id: { $eq: idProyecto } }, { $pull: { requisitos: nuevoRequisito._id } })
    nuevoRequisito.delete();
    res.json('Requisito borrado');
}

requisitoController.deleteAll = async (req, res) => {
    await requisito.remove({})
    res.json("Delete completado");

}

requisitoController.updateRequisito = async (req, res) => {
    const {nombre, prioridad, coste, descripcion, fechaInicio, fechaFin} = req.body;

    await requisito.updateOne({_id : {$eq:req.params.id}} , {$set : { nombre:nombre,
                                                                      prioridad:prioridad,
                                                                      coste:coste,
                                                                      descripcion:descripcion,
                                                                      fechaInicio:fechaInicio,
                                                                      fechaFin:fechaFin} })


    res.json("Put completado");
}


requisitoController.getUsuarios = async (req, res ) =>{
    const {id} = req.params
    var getRequisito = await requisito.findById(id)
    var listaUsuarios = []

    for(var i = 0; i < getRequisito.prioridad.length; i++) {
        var user = await usuario.findById(getRequisito.prioridad[i].usuario)
        listaUsuarios.push(user)
    }
    res.json({usuarios:listaUsuarios})
}



requisitoController.getUsuariosDisponibles = async (req, res) => {
    const proyect = await proyecto.findById(req.body.idProyecto);
    var usuariosProyecto = []
    var resultado = []
    usuariosProyecto = proyect.usuarios
    var aux = []
    const getrequisito = await requisito.findById(req.params.id)

    var usuariosRequisitos = getrequisito.prioridad

    for (var i = 0; i < usuariosRequisitos.length; i++) {
        aux.push(String(usuariosRequisitos[i].usuario))
    }
    for (var i = 0; i < usuariosProyecto.length; i++) {
        if ((usuariosProyecto.length == 0) || (!(aux.includes(String(usuariosProyecto[i].usuario)))&& !project.propietarios.includes(String(usuariosProyecto[i].usuario)))) {
            resultado.push(await usuario.findById(usuariosProyecto[i].usuario))
        }

    }
    res.send({ resultado })
}


requisitoController.postUsuarios = async (req, res ) =>{
    var prioridad = req.body.prioridad
    await requisito.updateOne({ _id: { $eq: req.params.id } }, { $push: { prioridad: prioridad } })


    
    res.json(prioridad)
}

requisitoController.updateImportancia = async (req, res ) =>{    
    const getRequisito = await requisito.findById(req.params.id)


    for(var i = 0; i < getRequisito.prioridad.length; i++){

        if(String(getRequisito.prioridad[i].usuario)==String(req.query.usuario)) {
            getRequisito.prioridad[i].valor = req.query.valor
            getRequisito.save()
        }
    }
    res.json(getRequisito)
}

module.exports = requisitoController;