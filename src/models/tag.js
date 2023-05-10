const mongoose = require('mongoose');

const Tag = mongoose.model('Tag', {
    petId: String,
    barcode: String,
    code: String,
    secret: String,
    status: String
});

module.exports = Tag;
