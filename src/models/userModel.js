const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
        required: true,
        default: '6458ffb8bc0eba5a402cb93e'
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)