const express = require('express');
const router = express.Router();

const { auth, admin } = require('../middlewares/auth');

const controller = require('../controllers/dash-controller');

router.get('/tutors', [auth, admin], controller.tutors);
router.get('/pets', [auth, admin], controller.pets);
router.get('/scanners', [auth, admin], controller.scanners);

module.exports = router;