const { Router } = require('express');
const router = Router();
const {getRequisitos, crearRequisito, borrarRequisito,  getRequisito, getUsuarios, deleteAll, updateRequisito} = require('../controllers/Requisito-controller');
router.route('/').get(getRequisitos)
    .post(crearRequisito)
    .delete(deleteAll);
router.route('/:id').get(getRequisito)
    .delete(borrarRequisito)
    .put(updateRequisito)


router.route('/:id/usuarios').get(getUsuarios)

module.exports = router;