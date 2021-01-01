const express = require('express');

const userController = require('../Controllers/userConroller');
const authController = require('../Controllers/authController');
const studentRouter = require('../Routes/studentRoutes');
const facultyRouter = require('../Routes/facultyRoutes');

const router = express.Router();

router.use('/students', studentRouter);
router.use('/faculty', facultyRouter);

router.route('/signup').post(authController.signupUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);

module.exports = router;
