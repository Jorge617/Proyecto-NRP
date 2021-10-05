const clienteController = {};

const cliente = require('../models/Cliente.js');


clienteController.getClientes = async (req, res)=> {
    const clientes = await cliente.find();
    res.json(clientes);
}
clienteController.getCliente = async (req, res)=> {
    const cliente = await cliente.findById(req.params.id);
    res.json(cliente);
}
clienteController.crearCliente = async (req, res)=> {
    const {username} = req.body;
    const nuevoCliente = new Cliente({username});
    await nuevoCliente.save();
    res.json({message : 'Cliente dado de alta'});
}
clienteController.borrarCliente = async (req, res) => {
    const { id } = req.params;
    await Cliente.findByIdAndDelete(id);
    res.json('Cliente borrado');
}
module.exports = clienteController;
