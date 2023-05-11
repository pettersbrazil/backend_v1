const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const configJWT = require('../config/jwt');
const mailer = require('../config/mail');

const User = require('../models/user');
const Profile = require('../models/profile');
const PasswordReset = require('../models/password-reset');

const FROM_MAILER = process.env.FROM_MAILER;

exports.login = async (req, res, next) => {

    const body = req.body;

    try {

        const user = await User.findOne({ email: body.email });

        if (!user) {
            res.status(404).json({
                error: true,
                message: 'Usuário não encontrado!'
            });
            return next();
        }

        const checkPassword = await bcrypt.compare(body.password, user.password);

        if (!checkPassword) {
            res.status(422).json({
                error: true,
                message: 'Senha inválida!'
            });
            return next();
        }

        // const secret = process.env.JWT_SECRET;
        const secret = configJWT.JWT_SECRET;

        const token = jwt.sign(
            {
                id: user._id
            },
            secret,
            {
               expiresIn: 3600
            }
        )

        res.status(200).json({
            success: true,
            data: {
              token,
              userId: user._id
            }
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.register = async (req, res, next) => {

    const body = req.body;

    try {

        const userExists = await User.findOne({ email: body.email });

        if (userExists) {
            res.status(422).json({
                error: true,
                message: 'Por favor, utilize outro e-mail!'
            });
            return next();
        }

        const passwordHash = await bcrypt.hash(body.password, 8);

        const name = body.name.split(' ');

        const user = await User.create({
            name: name[0],
            email: body.email,
            password: passwordHash,
            role: 'tutor',
            status: 'active',
            createdAt: new Date()
        });

        const profile = await Profile.create({
            userId: user._id,
            firstName: name[0],
            lastName: name[name.length],
            fullName: body.name,
        });

        res.status(201).json({
            success: true,
            data: {
                user,
                profile
            }
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.recoverPassword = async (req, res, next) => {

    const body = req.body;

    try {

        const userExists = await User.findOne({ email: body.email });

        if (userExists) {
            const token = Math.random().toString(36).substring(2,7);

            await PasswordReset.create({
                token,
                email: body.email
            });

            // send email
            mailer.transport.sendMail({
                from: FROM_MAILER,
                to: body.email,
                replyTo: FROM_MAILER,
                subject: "Recuperação de Senha",
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
                                    <th>Recuperar Senha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="center">
                                    <td>
                                        Seu código de recuperação: <strong>${token}</strong>
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
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.changePassword = async (req, res, next) => {

    const body = req.body;

    try {

        const passwordReset = await PasswordReset.findOne({ token: body.token });

        if (!passwordReset) {
            res.status(404).json({
                error: true,
                message: 'Código não encontrado!'
            });
            return next();
        }

        const passwordHash = await bcrypt.hash(body.password, 8);

        await User.updateOne(
            {
                email: passwordReset.email
            },
            {
                password: passwordHash
            }
        );

        res.status(200).json({
            success: true,
            data: body
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};
