const mongoose = require('mongoose');
const validator = require('validator');
// const generateEncryptPassword = require('../Utils/generateEncryptPassword');

const facultySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'User must have a first Name'],
        trim: true,
    },
    middleName: {
        type: String,
        required: [true, 'User must have a Middle Name'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'User must have a Last Name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Student must have an email'],
        trim: true,
        unique: true,
        validator: [validator.isEmail, 'Invalid Email ! Please check.'],
    },
    contactNumber: {
        type: Number,
        required: [true, 'User must have a Contact Number'],
        validator: [validator.isNumeric, 'Invalid Contact number'],
    },
    password: {
        type: String,
        select: false,
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    role: {
        type: String,
        default: 'faculty',
        enum: ['faculty'],
    },
});

// facultySchema.methods.changedPasswordAt = function (JWTTimestamp) {
//     if (this.passwordChangedAt) {
//         const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
//         return JWTTimestamp < changedTimeStamp;
//     }
// };

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
