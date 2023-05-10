const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');

const controller = require('../controllers/profile-controller');

router.get('/', auth, controller.get);
router.post('/', auth, controller.post);
router.patch('/', auth, controller.patch);

module.exports = router;
