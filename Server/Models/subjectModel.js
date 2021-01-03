const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subject must have a name'],
        trim: true,
    },
    semester: {
        type: Number,
        required: [true, 'Subject must belong to any semester'],
        min: [1, 'Semester must be greater than 1'],
        max: [8, 'Semester cannot be less than 8'],
    },
    syllabus: [
        // Each object refers to one UNIT
        {
            name: {
                type: String,
                required: [true, 'Unit must have a name.'],
                trim: true,
            },
            isCompleted: {
                type: Boolean,
                default: false,
            },
            unitNumber: {
                type: Number,
                required: [true, 'Unit must have a number.'],
            },
        },
    ],
    faculty: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Faculty',
        },
    ],
    students: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Student',
        },
    ],
});

subjectSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'faculty',
        select: 'firstName middleName lastName email',
    });
    next();
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
