const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth-controller');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/recover-password', controller.recoverPassword);
router.post('/change-password', controller.changePassword);

module.exports = router;