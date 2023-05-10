const Tag = require('../models/tag');

exports.all = async (req, res, next) => {

    const status = req.query.status;

    try {
        let tags;

        if (status === 'all') {
            tags = await Tag.find();
        } else {
            tags = await Tag.find({ status });
        }

        res.status(200).json({
            success: true,
            data: tags
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
        const tags = Array();
        const barcode = Math.floor(Math.random() * 999999);

        for (let i = 0; i < body.quantity; i++) {
            tags[i] = {
                barcode,
                code: Math.floor(Math.random() * 99999),
                secret: Math.random().toString(36).substring(2,7),
                status: "waiting",
            };
            await Tag.create(tags[i]);
         }

        res.status(201).json({
            success: true,
            data: tags
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.get = async (req, res, next) => {

    const code = req.query.code;
    const petId = req.query.petId;
    const secret = req.query.secret;

    try {

        let tag;
        if (!secret) {
            tag = await Tag.findOne({ $or: [ { code }, { petId } ] });
        } else {
            tag = await Tag.findOne({
                code,
                secret,
                status: 'waiting'
            });

            if (!tag) {
                res.status(404).json({
                    error: true,
                    message: 'O pingente não foi encontrado! Por favor, tente novamente.'
                });
                return next();
            }
        }

        res.status(200).json({
            success: true,
            data: tag
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.patch = async (req, res, next) => {

    const code = req.query.code;
    const body = req.body;

    try {
        await Tag.updateOne({ code }, body);

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
        const tag = await Tag.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            data: tag
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};
