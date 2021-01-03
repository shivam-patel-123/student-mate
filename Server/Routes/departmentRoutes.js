const express = require('express');

const subjectRouter = require('./subjectRoutes');
const departmentController = require('../Controllers/departmentController');

const router = express.Router();

router.use('/:departmentId/semesters/:semesterId/subject', subjectRouter);

router.route('/').get(departmentController.getAllDepartment).post(departmentController.createDepartment);
router.route('/:departmentId').get(departmentController.getDepartment);
router
    .route('/:departmentId/semesters')
    .get(departmentController.getAllSemesters)
    .post(departmentController.addSemesterToDepartment);

// router.route('/:departmentId/semesters/:semesterId').get(departmentController.getSemester);

module.exports = router;
