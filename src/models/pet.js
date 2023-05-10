const mongoose = require('mongoose');

const Pet = mongoose.model('Pet', {
    userId: String,
    avatar: String,
    name: String,
    age: String,
    species: String,
    breed: String,
    genre: String,
    description: String,
    createdAt: Date
});

module.exports = Pet;
