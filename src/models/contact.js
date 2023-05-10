const mongoose = require('mongoose');

const Contact = mongoose.model('Contact', {
    userId: String,
    phone: String
});

module.exports = Contact;
