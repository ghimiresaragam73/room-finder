const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: {
        required: true,
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        required: true,
        type: String
    },
    email: {
        type: String,
        sparse: true,
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    dob: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    image: String,
    role: {
        type: String,
        enum: ['admin', 'landlord', 'renter']
    }
}, {
    timestamps: true
})

var userModel = mongoose.model('user', userSchema);
module.exports = userModel;