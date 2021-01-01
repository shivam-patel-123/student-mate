const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'student',
        enum: ['student', 'faculty'],
    },
    enrollmentNumber: {
        type: Number,
        required: function () {
            return this.role === 'student';
        },
        index: { unique: true, sparse: true },
    },
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
        required: [true, 'User must have an email'],
        trim: true,
        unique: true,
        validator: [validator.isEmail, 'Invalid Email ! Please check properly.'],
    },
    contactNumber: {
        type: Number,
        required: [true, 'User must have a Contact Number'],
        validator: [validator.isNumeric, 'Invalid Contact number'],
    },
    academicYear: {
        type: Number,
        // default: 1,
        min: [1, 'Year cannot be less than 1'],
        max: [4, 'Year cannot be more than 4'],
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    password: {
        type: String,
        select: false,
        required: [true, 'User must have a password'],
    },
    subjects: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject',
        },
    ],
});

userSchema.pre('save', function (next) {
    if (this.role === 'faculty') {
        this.enrollmentNumber = undefined;
        this.academicYear = undefined;
    }
    next();
});

userSchema.methods.changedPasswordAt = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimeStamp;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
