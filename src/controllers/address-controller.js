const Address = require('../models/address');
const userController = require('./user-controller');

const { admin } = require('../middlewares/auth');

exports.post = async (req, res, next) => {

    const body = req.body;

    try {
        const address = await Address.create(body);

        res.status(201).json({
            success: true,
            data: address
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
        const address = await Address.findOne({ userId });

        res.status(200).json({
            success: true,
            data: address
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
        await Address.updateOne({ _id: id, userId: userId }, body);

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
