const { Router } = require('express');
const router = Router();
const{updateToken, getToken} = require('../controllers/Usuario-controller');
router.route('/:id').put(updateToken)
                           .get(getToken);
module.exports = router;