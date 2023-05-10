const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');

const controller = require('../controllers/role-controller');

router.get('/', auth, controller.get);
router.post('/', auth, controller.post);
router.patch('/:id', auth, controller.patch);
router.delete('/:id', auth, controller.delete);

module.exports = router;
