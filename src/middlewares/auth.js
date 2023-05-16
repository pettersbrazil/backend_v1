const jwt = require('jsonwebtoken');
const configJWT = require('../config/jwt');
const { promisify } = require('util');

const User = require('../models/user');

const secret = configJWT.JWT_SECRET;

module.exports = {

    auth: async function (req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: true,
                message: "Sem autorização para acessar o conteúdo! Falta o token."
            })
        }

        const [bearer, token] = authHeader.split(' ');

        if (!token) {
            return res.status(401).json({
                error: true,
                message: "Sem autorização para acessar o conteúdo! Falta o Bearer."
            })
        }

        try {
            const decode = await promisify(jwt.verify)(token, secret);
            req.userId = decode.id;
            return next();
        } catch(error) {
            return res.status(401).json({
                error: true,
                message: "Sem autorização para acessar o conteúdo! Token inválido."
            })
        }

    },

    admin: async function (req, res, next) {
        try {
            const user = await User.findOne({ _id: req.userId, role: 'admin' });

            if (!user) {
                return res.status(403).json({
                    error: true,
                    message: 'Sem autorização para acessar o conteúdo!'
                });
            }
            return next();
        } catch(error) {
            return res.status(500).json({
                error: true,
                message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
            })
        }
    }

}
