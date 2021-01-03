const Department = require('../Models/departmentModel');
const catchAsync = require('../Utils/catchAsync');

exports.getAllDepartment = catchAsync(async (req, res, next) => {
    const departments = await Department.find();

    res.status(200).json({
        status: 'success',
        data: {
            departments,
        },
    });
});

exports.getDepartment = catchAsync(async (req, res, next) => {
    const department = await Department.findById(req.params.departmentId);

    res.status(200).json({
        status: 'success',
        data: {
            department,
        },
    });
});

exports.getAllSemesters = catchAsync(async (req, res, next) => {
    const semesters = Department.findById(req.params.departmentId).select('semesters -_id');

    res.status(200).json({
        status: 'success',
        data: {
            semesters: semesters.semesters,
        },
    });
});

// exports.getSemester = catchAsync(async (req, res, next) => {
//     const semester = await Department.findOne({
//         _id: req.params.departmentId,
//         'semesters._id': req.params.semesterId,
//     });

//     res.status(200).json({
//         status: 'success',
//         data: {
//             semester,
//         },
//     });
// });

exports.createDepartment = catchAsync(async (req, res, next) => {
    const { departmentName, semesters } = req.body;

    const department = await Department.create({
        departmentName,
        semesters,
    });

    res.status(201).json({
        status: 'success',
        data: {
            department,
        },
    });
});

exports.addSemesterToDepartment = catchAsync(async (req, res, next) => {
    const dep = await Department.findById(req.params.departmentId);
    const filteredBody = req.body.semesters.filter((semester) => {
        let isExist = false;
        dep.semesters.forEach((el) => {
            if (el.semesterNumber == semester.semesterNumber) {
                isExist = true;
            }
        });
        if (!isExist) return semester;
    });

    const department = await Department.findByIdAndUpdate(
        req.params.departmentId,
        {
            $push: {
                semesters: { $each: filteredBody },
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: 'success',
        data: {
            department,
        },
    });
});
