const AppError = require('../Utils/appError');

const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        err: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
        msg: err.message
    })
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`;

    return new AppError(message, 400);
}

const handleDuplicateFieldDB = err => {
    const errors = Object.values(err.keyValue)[0];
    const message = `Duplicate Value. ${errors}`;
    return new AppError(message, 400);
}

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400);
}

const handleJWTError = err => new AppError('Invalid Token. Please login again.', 401);

const handleJWTExpire = err => new AppError('Your Token has expired. Please login in again', 401)

// GLOBAL ERROR MIDDLEWARE
module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    console.log(err.name)

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {

        let error = {...err};
        error.message = err.message

        if(err.name === 'ValidationError') error = handleValidationErrorDB(error);
        if(err.code === 11000) error = handleDuplicateFieldDB(error);
        if(err.name === 'CastError') error = handleCastError(error);
        if(err.name === 'JsonWebTokenError') error = handleJWTError(error);
        if(err.name === 'TokenExpiredError') error = handleJWTExpire(error);

        sendErrorProd(error, req, res);
    }

}