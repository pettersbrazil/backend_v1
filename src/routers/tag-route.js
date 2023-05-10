const express = require('express');
const router = express.Router();

const { role } = require('../middlewares/role');
const { auth, admin } = require('../middlewares/auth');

const controller = require('../controllers/tag-controller');

router.get('/findOne', controller.get);
router.get('/', [auth, admin, role], controller.all);
router.post('/', [auth, admin, role], controller.post);
router.patch('/', [auth, role], controller.patch);
router.delete('/:id', [auth, admin, role], controller.delete);

module.exports = router;
