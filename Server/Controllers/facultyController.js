const User = require('../Models/userModel');
const catchAsync = require('../Utils/catchAsync');

exports.getAllFaculty = catchAsync(async (req, res, next) => {
    const faculty = await User.find({ role: 'faculty' });

    res.status(200).json({
        status: 'success',
        data: {
            faculty,
        },
    });
});

exports.getFaculty = catchAsync(async (req, res, next) => {
    const faculty = await User.findById(req.params.id);

    if (!faculty) return next(new AppError('No faculty found with the given Id', 404));

    res.status(200).json({
        status: 'success',
        data: {
            faculty,
        },
    });
});
