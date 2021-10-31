const { Router } = require('express');
const router = Router();
const {getRequisitos, crearRequisito, borrarRequisito,  getRequisito, getUsuarios, deleteAll} = require('../controllers/Requisito-controller');
router.route('/').get(getRequisitos)
    .post(crearRequisito)
    .delete(deleteAll);
router.route('/:id').get(getRequisito)
    .delete(borrarRequisito);


router.route('/:id/usuarios').get(getUsuarios)

module.exports = router;