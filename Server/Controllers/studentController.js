const User = require('../Models/userModel');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');

exports.getAllStudents = catchAsync(async (req, res, next) => {
    const students = await User.find({ role: 'student' });

    res.status(200).json({
        status: 'success',
        data: {
            students,
        },
    });
});

exports.getStudent = catchAsync(async (req, res, next) => {
    const student = await User.findById(req.params.id);

    if (!student) return next(new AppError('No Student found with the given Id', 404));

    res.status(200).json({
        status: 'success',
        data: {
            student,
        },
    });
});

exports.addSubjectsToStudents = catchAsync(async (req, res, next) => {
    // const units = await User.findByIdAndUpdate(
    //     req.params.studentId,
    //     {
    //         $push: {
    //             subjects: { $each: req.body.subjects }, // $each: [ {}, {}, {}, ..... ]
    //         },
    //     },
    //     {
    //         new: true,
    //         runValidators: true,
    //     }
    // );

    const result = await User.updateMany(
        { _id: { $in: req.body.users } },
        {
            $push: {
                subjects: { $each: req.body.subjects },
            },
        },
        {
            new: true,
            runValidators: true,
            multi: true,
        }
    );

    if (result.nModified) {
        res.status(201).json({
            status: ' success',
        });
    }
});
