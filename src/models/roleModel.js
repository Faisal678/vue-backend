const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    permissionIds: {
        type: [mongoose.Types.ObjectId],
        ref: 'Permission',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema)