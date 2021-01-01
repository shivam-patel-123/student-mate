const express = require('express');

const authController = require('../Controllers/authController');
const userController = require('../Controllers/userConroller');

const router = express.Router();

router.route('/').patch(authController.protect, userController.uploadUserPhoto, userController.updateMe);

module.exports = router;
