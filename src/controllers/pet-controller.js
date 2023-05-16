const Pet = require('../models/pet');
const { admin } = require('../middlewares/auth');

exports.all = async (req, res, next) => {

    const userId = req.query.userId;

    try {

        let pets;
        if (userId) {
            pets = await Pet.find({ userId });
        } else if (admin) {
            pets = await Pet.find();
        }

        res.status(200).json({
            success: true,
            data: pets
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
        const pet = await Pet.create(body);

        res.status(201).json({
            success: true,
            data: pet
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
        const pet = await Pet.findOne({ _id: id });

        if (pet) {
            res.status(200).json({
                success: true,
                data: pet
            })
        } else {
            res.status(404).json({
                error: true,
                message: 'O pet não foi encontrado! Por favor, tente novamente.'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.patch = async (req, res, next) => {

    const id = req.params.id;
    const body = req.body;

    try {
        await Pet.updateOne({ _id: id }, body);

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
