const { Router } = require('express');
const router = Router();
const {registro, login, updateToken, getToken, getUsuarios, getUsuario, updateUsuario, borrarUsuario, getUsuarioByToken} = require('../controllers/Usuario-controller');
router.route('/').post(registro)
                 .get(getUsuarios);

router.route('/login').get(login);

router.route('/:id').get(getUsuario)
                    .put(updateUsuario)
                     .delete(borrarUsuario);

router.route('/token/:token').get(getUsuarioByToken)

module.exports = router;