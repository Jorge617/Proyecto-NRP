const { Router } = require('express');
const router = Router();
const{crearProyecto, getProyectos, getProyecto, deleteProyecto, updateProyecto,
      postUsuarios, getUsuarios, postRequisitos, getRequisitos,deleteUsuarios, deleteRequisitos,
      updateUsuarios, updateRequisitos} = require('../controllers/Proyecto-controller');

router.route('/').post(crearProyecto)
                 .get(getProyectos);

router.route('/:id').get(getProyecto)
                    .delete(deleteProyecto)
                    .put(updateProyecto)

router.route('/:id/usuarios').post(postUsuarios)
                             .get(getUsuarios)
                             .delete(deleteUsuarios)
router.route('/:id/requisitos').post(postRequisitos)
                               .get(getRequisitos)
                               .delete(deleteRequisitos)
                              
module.exports = router;