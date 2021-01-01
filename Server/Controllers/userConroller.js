const multer = require('multer');
const { promisify } = require('util');

const Faculty = require('../Models/facultyModel');
const Student = require('../Models/studentModel');
const User = require('../Models/userModel');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');
const generateEncryptPassword = require('../Utils/generateEncryptPassword');

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

    let user;

    if (req.user.role === 'student') {
        user = await Student.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true,
        });
    } else if (req.user.role === 'faculty') {
        user = await Faculty.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true,
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});
