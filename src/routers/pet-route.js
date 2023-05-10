const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');

const controller = require('../controllers/pet-controller');

router.get('/', auth, controller.all);
router.post('/', auth, controller.post);
router.get('/:id', controller.get);
router.patch('/:id', auth, controller.patch);

module.exports = router;