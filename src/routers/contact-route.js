const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');

const controller = require('../controllers/contact-controller');

router.post('/', controller.post);
router.get('/', controller.get);
router.put('/:id', auth, controller.put);

module.exports = router;
