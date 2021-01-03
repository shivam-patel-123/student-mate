const multer = require('multer');

const User = require('../Models/userModel');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Assets/img/users');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`); // example: user-dghufwui4rvjeo35j-14526874562123.jpg
    },
});

const multerFilter = (req, res, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Please Choose an Image.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    filter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.updateMe = catchAsync(async (req, res, next) => {
    const filteredBody = { ...req.body };

    if (req.file) filteredBody.photo = req.file.filename;

    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});
