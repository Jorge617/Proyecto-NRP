const clienteController = {};

const cliente = require('../models/Cliente.js');


clienteController.getClientes = async (req, res)=> {
    const clientes = await cliente.find();
    res.json(clientes);
}
clienteController.getCliente = async (req, res)=> {
    const getcliente = await cliente.findById(req.params.id);
    res.json(getcliente);
}
clienteController.crearCliente = async (req, res)=> {
    const {nombre, prioridad, importancia} = req.body;
    const nuevoCliente = new cliente({nombre, prioridad, importancia});
    await nuevoCliente.save();
    res.json({message : 'Cliente dado de alta'});
}
clienteController.borrarCliente = async (req, res) => {
    const { id } = req.params;
    await cliente.findByIdAndDelete(id);
    res.json('Cliente borrado');
}

clienteController.updateCliente  = async (req, res) => {
    const {nombre, prioridad, importancia} = req.body;
    await cliente.findByIdAndUpdate(req.params.id, {
        nombre, prioridad, importancia
    });
    res.json('Product Updated');
}

module.exports = clienteController;
