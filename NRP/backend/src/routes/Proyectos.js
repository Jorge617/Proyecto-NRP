const { Router } = require('express');
const router = Router();
const{crearProyecto, getProyectos, getProyecto, deleteProyecto, updateProyecto,
      postUsuarios, getUsuarios, postRequisitos, getRequisitos} = require('../controllers/Proyecto-controller');

router.route('/').post(crearProyecto)
                 .get(getProyectos);

router.route('/:id').get(getProyecto)
                    .delete(deleteProyecto)
                    .put(updateProyecto)

router.route('/:id/usuarios').post(postUsuarios)
                             .get(getUsuarios)
router.route('/:id/requisitos').post(postRequisitos)
                               .get(getRequisitos)
module.exports = router;