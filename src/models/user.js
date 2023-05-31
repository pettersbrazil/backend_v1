const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    role: String,
    status: String,
    createdAt: Date
});

module.exports = User;
