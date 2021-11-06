const { Router } = require('express');
const router = Router();
const {registro, login, updateToken, getToken, getUsuarios, getUsuario, updateUsuario, borrarUsuario, getUsuarioByToken,
       getProyectos, getProyectosPropietario, deleteAll, getRequisitosProyecto } = require('../controllers/Usuario-controller');
router.route('/').post(registro)
                 .get(getUsuarios)
                 .delete(deleteAll)

router.route('/login').get(login);

router.route('/:id').get(getUsuario)
                    .put(updateUsuario)
                     .delete(borrarUsuario);

router.route('/token/:token').get(getUsuarioByToken)

router.route('/:id/proyectos').get(getProyectos)
router.route('/:id/proyectos/propietario').get(getProyectosPropietario)


router.route('/:id/proyecto/requisitos').get(getRequisitosProyecto)


module.exports = router;