const mongoose = require('mongoose');

const Role = mongoose.model('Role', {
    userId: String,
    roles: {
        admin: {
            create: Number,
            read: Number,
            update: Number,
            delete: Number
        },
        tag: {
            create: Number,
            read: Number,
            update: Number,
            delete: Number
        }
    }
});

module.exports = Role;
