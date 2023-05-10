const mongoose = require('mongoose');

const Profile = mongoose.model('Profile', {
    userId: String,
    fullName: String
});

module.exports = Profile;
