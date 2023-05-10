const Scanner = require('../models/scanner');

exports.get = async (req, res, next) => {

    const tagId = req.query.tagId;

    try {
        const scanner = await Scanner.find({ tagId });

        res.status(200).json({
            success: true,
            data: scanner
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
        const scanner = await Scanner.create(body);

        res.status(201).json({
            success: true,
            data: scanner
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};
