const mongoose = require('mongoose');

const Address = mongoose.model('Address', {
    userId: String,
    zip: String,
    addressline: String,
    streetNumber: String,
    complement: String,
    district: String,
    city: String,
    state: String,
    country: String
});

module.exports = Address;
