const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        trim: true,
        required: [true, 'Department must have a name'],
    },
    semesters: [
        {
            semesterNumber: {
                type: Number,
                required: [true, 'Semester must have a number'],
                min: [1, 'Semester must be greater than 1'],
                max: [8, 'Semester cannot be less than 8'],
            },
            subjects: [
                {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Subject',
                },
            ],
        },
    ],
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
