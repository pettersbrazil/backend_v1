const bcrypt = require('bcryptjs');
const userController = require('./user-controller');
const { admin } = require('../middlewares/auth');

const Role = require('../models/role');

exports.post = async (req, res, next) => {

    const body = req.body;

    try {

        const role = await Role.create(body);

        res.status(201).json({
            success: true,
            data: role
        });
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
        const role = await Role.findOne({ userId });

        res.status(200).json({
            success: true,
            data: role
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
    let id = req.params.id;

    try {

        await Role.updateOne({ _id: id }, body);

        res.status(200).json({
            success: true,
            data: body
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
        const role = await Role.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            data: role
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};
