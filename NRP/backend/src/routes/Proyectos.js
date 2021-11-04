const { Router } = require('express');
const router = Router();
const{crearProyecto, getProyectos, getProyecto, deleteProyecto, updateProyecto,
      postUsuarios, getUsuarios, postRequisitos, getRequisitos,deleteUsuarios, deleteRequisitos,
       getUsuariosDisponibles, getUsuariosInfo, deleteAll} = require('../controllers/Proyecto-controller');

router.route('/').post(crearProyecto)
                 .get(getProyectos)
                 .delete(deleteAll);

router.route('/:id').get(getProyecto)
                    .delete(deleteProyecto)
                    .put(updateProyecto)

router.route('/:id/usuarios').post(postUsuarios)
                             .get(getUsuariosInfo)
                             .delete(deleteUsuarios)
router.route('/:id/requisitos').post(postRequisitos)
                               .get(getRequisitos)
                               .delete(deleteRequisitos)

 router.route('/:id/usuarios-disponibles').get(getUsuariosDisponibles)
 router.route('/:id/usuarios-importancia').get(getUsuarios)


                              
module.exports = router;