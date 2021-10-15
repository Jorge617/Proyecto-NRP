const { Router } = require('express');
const router = Router();
const {getClientes, crearCliente, borrarCliente,  getCliente, updateCliente} = require('../controllers/Cliente-controller');
router.route('/').get(getClientes)
    .post(crearCliente);

router.route('/:id').get(getCliente)
    .put(updateCliente)
    .delete(borrarCliente);
module.exports = router;