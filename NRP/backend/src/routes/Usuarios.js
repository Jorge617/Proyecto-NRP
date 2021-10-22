const { Router } = require('express');
const router = Router();
const {registro, login, updateToken, getToken, getUsuarios, getUsuario, updateUsuario, borrarUsuario} = require('../controllers/Usuario-controller');
router.route('/').post(registro)
                 .get(getUsuarios);
router.route('/tokens/:id').put(updateToken)
                           .get(getToken);
router.route('/login').get(login);

router.route('/:id').get(getUsuario)
                    .put(updateUsuario)
                     .delete(borrarUsuario);

module.exports = router;