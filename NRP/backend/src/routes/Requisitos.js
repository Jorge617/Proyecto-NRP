const { Router } = require('express');
const router = Router();
const {getRequisitos, crearRequisito, borrarRequisito,  getRequisito} = require('../controllers/Requisito-controller');
router.route('/').get(getRequisitos)
    .post(crearRequisito);

router.route('/:id').get(getRequisito)
    .delete(borrarRequisito);
module.exports = router;