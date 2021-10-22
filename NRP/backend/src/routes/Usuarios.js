const { Router } = require('express');
const router = Router();
const {registro, login, updateToken, getToken, getUsuarios} = require('../controllers/Usuario-controller');
router.route('/').post(registro)
                 .get(getUsuarios);
router.route('/tokens/:id').put(updateToken)
                           .get(getToken);
router.route('/login').get(login);


module.exports = router;