const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'student',
        enum: ['student'],
    },
    // enrollmentNumber: {
    //     type: Number,
    //     required: [
    //         () => {
    //             return this.role === student;
    //         },
    //         'Student must have a pen Number',
    //     ],
    //     validator: [validator.isNumeric, 'Enrollment Number cannot contain alphabets'],
    //     unique: true,
    // },
    enrollmentNumber: {
        type: Number,
        required: [true, 'Student must have a pen Number'],
        validator: [validator.isNumeric, 'Enrollment Number cannot contain alphabets'],
        unique: true,
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
        required: [true, 'Student must have an email'],
        trim: true,
        unique: true,
        validator: [validator.isEmail, 'Invalid Email ! Please check.'],
    },
    contactNumber: {
        type: Number,
        required: [true, 'User must have a Contact Number'],
        validator: [validator.isNumeric, 'Invalid Contact number'],
        // validate: {
        //     validator: function(val) {
        //         const re = /^\d{10}$/;
        //         return (val === null || val.trim().length < 1 || re.test(val))
        //     },
        //     message: 'Invalid Phone Number!'
        // }
    },
    academicYear: {
        type: Number,
        default: 1,
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
        required: [true, 'Student must have a password'],
    },
    subjects: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject',
        },
    ],
});

studentSchema.methods.changedPasswordAt = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimeStamp;
    }
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
