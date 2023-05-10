const mongoose = require('mongoose');

const Scanner = mongoose.model('Scanner', {
    userId: String,
    tagId: String,
    addressId: String,
    location: Object,
    createdAt: Date
});

module.exports = Scanner;
