const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

function userId(req) {
    const token = req.header('authorization').split('Bearer ')[1];
    return jwt.decode(token).id;
}

exports.all = async (req, res, next) => {

    const role = req.query.role;

    try {
        const users = await User.find({ role }, '-password');

        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.post = async (req, res, next) => {

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

        const user = await User.create({
            name: body.name,
            email: body.email,
            role: 'admin',
            status: 'active'
        });

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.get = async (req, res, next) => {

    const id = req.params.id;

    try {
        const user = await User.findOne({ _id: id }, '-password');

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.patch = async (req, res, next) => {

    const body = req.body;
    const id = req.params.id;

    let data;

    try {

        if (body.password) {
            const user = await User.findOne({ _id: id });
            const passwordHash = await bcrypt.hash(body.newPassword, 8);
            const checkPassword = await bcrypt.compare(body.password, user.password);

            if (!checkPassword) {
                res.status(422).json({
                    error: true,
                    message: 'Senha inválida!'
                });
                return next();
            }

            data = {
              password: passwordHash
            }
        } else {
            const name = body.name.split(' ');

            data = {
              name: name[0],
              email: body.email
            }
        }

        await User.updateOne({ _id: id }, data);
        const user = await User.findOne({ _id: id }, '-password');

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.delete = async (req, res, next) => {

    const id = req.params.id;

    try {

        if (id === userId(req)) {
            res.status(422).json({
                error: true,
                message: 'Você não pode excluir seu usuário!'
            });
            return next();
        }

        const user = await User.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};
