const Profile = require('../models/profile');

exports.post = async (req, res, next) => {

    const body = req.body;

    try {
        const profile = await Profile.create(body);

        res.status(201).json({
            success: true,
            data: profile
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
        const profile = await Profile.findOne({ userId });

        res.status(200).json({
            success: true,
            data: profile
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.patch = async (req, res, next) => {

    const userId = req.query.userId;
    const body = req.body;

    try {
        await Profile.updateOne({ userId }, body);

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
