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
    await requisito.findByIdAndDelete(id);
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

module.exports = requisitoController;