const express = require('express');
const studentController = require('../Controllers/studentController');

const router = express.Router();

router.route('/').get(studentController.getAllStudents);
router.route('/:id').get(studentController.getStudent);
router.route('/subject').post(studentController.addSubjectsToStudents);

module.exports = router;
