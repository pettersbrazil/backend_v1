require('dotenv').config();

const Contact = require('../models/contact');

const mailer = require('../config/mail');

// const TO_MAILER = process.env.TO_MAILER;
// const FROM_MAILER = process.env.FROM_MAILER;
const TO_MAILER = mailer.TO_MAILER;
const FROM_MAILER = process.env.FROM_MAILER;

exports.sendMail = async (req, res, next) => {

    const body = req.body;

    // send email
    mailer.transport.sendMail({
        from: FROM_MAILER,
        to: TO_MAILER,
        replyTo: body.email,
        subject: body.subject,
        html: `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Petter's Brazil</title>
                <style>
                    html,
                    body {
                        background-color: #632ac0;
                        padding: 20px 50px;
                    }

                    table {
                        background-color: #ffffff;
                        border-radius: 5px;
                        padding: 30px 20px 50px 20px;
                    }

                    table > thead > tr > th {
                        font-size: 24px;
                        color: #08c49f;
                        padding-bottom: 50px;
                    }

                    .image {
                        padding: 30px;
                    }

                    .center {
                        text-align: center;
                    }

                    .color-light {
                        color: #ffffff;
                    }
                </style>
            </head>
            <body>
                <div class="image center">
                    <img src="../assets/logo_greenwater.png" width="150px">
                </div>
                <table width="100%">
                    <thead>
                        <tr class="center">
                            <th colspan="2">Fale Conosco</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Nome:</strong></td>
                            <td>${body.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Telefone:</strong></td>
                            <td>${body.phone}</td>
                        </tr>
                        <tr>
                            <td><strong>E-mail:</strong></td>
                            <td>${body.email}</td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>Descrição:</strong></td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                ${body.description}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="center color-light">
                    <i>Petter's Brazil</i>
                </p>
            </body>
        </html>`
    })
    .then(() => {
      res.status(200).json({
          success: true,
          data: body
      })
    })
    .catch(() => {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    });
};

exports.post = async (req, res, next) => {

    const body = req.body;

    try {

        const contact = await Contact.create(body);

        res.status(201).json({
            success: true,
            data: contact
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.get = async (req, res, next) => {

    const userId = req.query.userId;

    try {
        const contact = await Contact.findOne({ userId });

        res.status(200).json({
            success: true,
            data: contact
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.put = async (req, res, next) => {

    const body = req.body;

    const id = req.params.id;
    const userId = req.userId;

    try {
        await Contact.updateOne({ _id: id, userId: userId }, body);

        res.status(200).json({
            success: true,
            data: req.body
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};
