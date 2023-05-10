const User = require('../models/user');
const Pet = require('../models/pet');
const Scanner = require('../models/scanner');

exports.tutors = async (req, res, next) => {

    try {

        const date = new Date();
        const dateWeek = new Date();
        dateWeek.setDate(dateWeek.getDate() - 7);

        const total = await User.find({ role: "tutor" }).count();
        const today = await User.find({ role: "tutor", createdAt: { $gte: date.toLocaleDateString('en-CA') } }).count();
        const week = await User.find({ role: "tutor", createdAt: { $gte: dateWeek.toLocaleDateString('en-CA'), $lt: date.toLocaleDateString('en-CA') } }).count();

        res.status(200).json({
            success: true,
            data: {
                total,
                today,
                week
            }
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.pets = async (req, res, next) => {

    try {

        const date = new Date();
        const dateWeek = new Date();
        dateWeek.setDate(dateWeek.getDate() - 7);

        const total = await Pet.find().count();
        const today = await Pet.find({ createdAt: { $gte: date.toLocaleDateString('en-CA') } }).count();
        const week = await Pet.find({ createdAt: { $gte: dateWeek.toLocaleDateString('en-CA'), $lt: date.toLocaleDateString('en-CA') } }).count();

        res.status(200).json({
            success: true,
            data: {
                total,
                today,
                week
            }
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};

exports.scanners = async (req, res, next) => {

    try {

        const date = new Date();
        const dateWeek = new Date();
        dateWeek.setDate(dateWeek.getDate() - 7);

        const total = await Scanner.find().count();
        const today = await Scanner.find({ createdAt: { $gte: date.toLocaleDateString('en-CA') } }).count();
        const week = await Scanner.find({ createdAt: { $gte: dateWeek.toLocaleDateString('en-CA'), $lt: date.toLocaleDateString('en-CA') } }).count();

        res.status(200).json({
            success: true,
            data: {
                total,
                today,
                week
            }
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};
