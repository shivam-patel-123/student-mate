const express = require('express');
const authController = require('../Controllers/authController');
const facutlyController = require('../Controllers/facultyController');

const router = express.Router();

router.route('/').get(facutlyController.getAllFaculty);
router.route('/:id').get(facutlyController.getFaculty);

module.exports = router;
