const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');

const controller = require('../controllers/scanner-controller');

router.get('/', controller.get);
router.post('/', controller.post);

module.exports = router;
