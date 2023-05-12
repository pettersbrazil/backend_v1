require('dotenv').config();
const nodemailer = require('nodemailer');

// const HOST_MAILER = process.env.HOST_MAILER;
// const PORT_MAILER = process.env.PORT_MAILER;
// const USER_MAILER = process.env.USER_MAILER;
// const PASS_MAILER = process.env.PASS_MAILER;
const HOST_MAILER = 'smtp-mail.outlook.com';
const PORT_MAILER = 587;
const USER_MAILER = 'pettersbrazil@outlook.com';
const PASS_MAILER = "PeTTer's#@!";

// exports.FROM_MAILER = process.env.FROM_MAILER;
// exports.TO_MAILER = process.env.TO_MAILER;
exports.FROM_MAILER = 'pettersbrazil@outlook.com';
exports.TO_MAILER = 'pettersbrazil@outlook.com';

exports.transport = nodemailer.createTransport({
    host: HOST_MAILER,
    port: PORT_MAILER,
    secureConnection: false,
    auth: {
        user: USER_MAILER,
        pass: PASS_MAILER
    },
    tls: {
      ciphers: 'SSLv3'
    }
});
