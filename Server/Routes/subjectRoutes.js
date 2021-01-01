const express = require('express');
const subjectController = require('../Controllers/subjectController');
const authController = require('../Controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(subjectController.getAllSubjects)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'faculty'),
        subjectController.createSubject
    );

router
    .route('/:subjectId')
    .get(subjectController.getSubject)
    .patch(
        authController.protect,
        authController.restrictTo('admin', 'faculty'),
        subjectController.updateSubject
    );

router
    .route('/:subjectId/syllabus')
    .post(
        authController.protect,
        authController.restrictTo('admin', 'faculty'),
        subjectController.filterRequestBody,
        subjectController.addUnitToSyllabus
    );

router
    .route('/:subjectId/faculty')
    .post(subjectController.filterRequestBody, subjectController.addFacultyToSubject);

module.exports = router;
