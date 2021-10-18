const requisitoController = {};

const requisito = require('../models/Requisito.js');


requisitoController.getRequisitos = async (req, res)=> {
    const requisitos = await requisito.find();
    res.json(requisitos);
}
requisitoController.getRequisito = async (req, res)=> {
    const getrequisito = await requisito.findById(req.params.id);
    res.json(getrequisito);
}
requisitoController.crearRequisito = async (req, res)=> {
    const {nombre, prioridad, coste} = req.body;
    const nuevoRequisito = new requisito({nombre, prioridad, coste});
    await nuevoRequisito.save();
    res.json({message : `Requisito dado de alta ${nombre} ${prioridad} ${coste} `});
}
requisitoController.borrarRequisito = async (req, res) => {
    const { id } = req.params;
    await requisito.findByIdAndDelete(id);
    res.json('Requisito borrado');
}
module.exports = requisitoController;