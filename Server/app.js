const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const subjectRouter = require('./Routes/subjectRoutes');
const currentUserRouter = require('./Routes/currentUserRoutes');
const globalErrorHandler = require('./Controllers/errorController');
const userRouter = require('./Routes/userRoutes');
const departmentRouter = require('./Routes/departmentRoutes');

const app = express();
const latestApiVersionRoute = '/api/v1/';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ROUTES
app.use(`${latestApiVersionRoute}departments`, departmentRouter);
app.use(`${latestApiVersionRoute}subjects`, subjectRouter);
app.use(`${latestApiVersionRoute}currentUser`, currentUserRouter);
app.use(`${latestApiVersionRoute}users`, userRouter);

app.use(globalErrorHandler);

module.exports = app;
