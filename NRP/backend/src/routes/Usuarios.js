const { Router } = require('express');
const router = Router();
const {registro, login} = require('../controllers/Usuario-controller');
router.route('/').get(login)
    .post(registro);


module.exports = router;