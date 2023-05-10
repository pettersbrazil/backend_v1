const mongoose = require('mongoose');

const PasswordReset = mongoose.model('PasswordReset', {
    email: String,
    token: String
});

module.exports = PasswordReset;