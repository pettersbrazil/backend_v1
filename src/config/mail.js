require('dotenv').config();
const nodemailer = require('nodemailer');

const HOST_MAILER = process.env.HOST_MAILER;
const PORT_MAILER = process.env.PORT_MAILER;
const USER_MAILER = process.env.USER_MAILER;
const PASS_MAILER = process.env.PASS_MAILER;
const FROM_MAILER = process.env.FROM_MAILER;

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
