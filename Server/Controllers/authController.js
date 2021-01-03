const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');

const User = require('../Models/userModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const generateEncryptPassword = require('../Utils/generateEncryptPassword');

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = generateToken(user);

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

exports.signupUser = catchAsync(async (req, res, next) => {
    const {
        role,
        enrollmentNumber,
        firstName,
        middleName,
        lastName,
        email,
        contactNumber,
        academicYear,
        department,
        semester,
    } = req.body;
    const password = generateEncryptPassword();

    const user = await User.create({
        role,
        enrollmentNumber,
        firstName,
        middleName,
        lastName,
        email,
        academicYear,
        contactNumber,
        password,
        department,
        semester,
    });

    createSendToken(user, 201, res);
});

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    const encryptedPassword = crypto.createHash('sha256').update(password).digest('hex');

    if (!user || encryptedPassword !== user.password) {
        return next(new AppError('Incorrect email or password', 401));
    }

    createSendToken(user, 200, res);
};

exports.logoutUser = (req, res) => {
    res.cookie('jwt', 'loggedOut', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        status: 'success',
    });
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) return next(new AppError('You are not logged in. Please log in to get access.'));

    // Verify Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists.
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) next(new AppError('User belonging to this token does no longer exist', 401));

    // Check if user changed password after token was issued.
    if (currentUser.changedPasswordAt(decoded.iat)) {
        return next(new AppError('User recently changed the password. Please log in again', 401));
    }

    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
