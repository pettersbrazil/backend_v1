const express = require('express');
const router = express.Router();

const { role } = require('../middlewares/role');
const { auth, admin } = require('../middlewares/auth');

const controller = require('../controllers/user-controller');

router.get('/', [auth, admin, role], controller.all);
router.post('/', [auth, admin, role], controller.post);
router.get('/:id', role, controller.get);
router.patch('/:id', [auth, role], controller.patch);
router.delete('/:id', [auth, role], controller.delete);

module.exports = router;
