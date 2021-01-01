const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const subjectRouter = require('./Routes/subjectRoutes');
const currentUserRouter = require('./Routes/currentUserRoutes');
const globalErrorHandler = require('./Controllers/errorController');
const userRouter = require('./Routes/userRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ROUTES
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/currentUser', currentUserRouter);
app.use('/api/v1/users', userRouter);

app.use(globalErrorHandler);

module.exports = app;
