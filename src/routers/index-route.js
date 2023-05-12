const express = require('express');
const router = express.Router();

const addressRoute = require('./address-route');
const contactRoute = require('./contact-route');
const contactUsRoute = require('./contact-us-route');
const tagRoute = require('./tag-route');
const petRoute = require('./pet-route');
const scannerRoute = require('./scanner-route');
const profileRoute = require('./profile-route');
const userRoute = require('./user-route');
const roleRoute = require('./role-route');
const authRoute = require('./auth-route');
const dashRoute = require('./dash-route');

router.use('/addresses', addressRoute);
router.use('/contact-us', contactUsRoute);
router.use('/contacts', contactRoute);
router.use('/tags', tagRoute);
router.use('/pets', petRoute);
router.use('/scanners', scannerRoute);
router.use('/profiles', profileRoute);
router.use('/users', userRoute);
router.use('/roles', roleRoute);
router.use('/auth', authRoute);
router.use('/dash', dashRoute);

module.exports = router;
