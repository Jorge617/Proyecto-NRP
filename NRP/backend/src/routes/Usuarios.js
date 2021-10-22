const { Router } = require('express');
const router = Router();
const {registro, login} = require('../controllers/Usuario-controller');
router.route('/').post(registro);
router.route('/login').get(login);


module.exports = router;