const { Router } = require('express');
const router = Router();
const { getRequisitos, crearRequisito, borrarRequisito, getRequisito, getUsuarios, deleteAll, updateRequisito, getUsuariosDisponibles, postUsuarios } = require('../controllers/Requisito-controller');
router.route('/').get(getRequisitos)
    .post(crearRequisito)
    .delete(deleteAll);
router.route('/:id').get(getRequisito)
    .delete(borrarRequisito)
    .put(updateRequisito)


router.route('/:id/usuarios').get(getUsuarios)
                             .post(postUsuarios)
router.route('/:id/usuarios-disponibles').get(getUsuariosDisponibles)


module.exports = router;