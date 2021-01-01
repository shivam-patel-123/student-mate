const Subject = require('../Models/subjectModel');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');

exports.getAllSubjects = catchAsync(async (req, res, next) => {
    const subjects = await Subject.find();

    res.status(200).json({
        status: 'success',
        data: {
            subjects,
        },
    });
});

exports.getSubject = catchAsync(async (req, res, next) => {
    const subject = await Subject.findById(req.params.subjectId);

    if (!subject) return new AppError('No subject found with the given id', 404);

    res.status(200).json({
        status: 'success',
        data: {
            subject,
        },
    });
});

exports.createSubject = catchAsync(async (req, res, next) => {
    const { name, semester, faculty, students } = req.body;

    const subject = await Subject.create({
        name,
        semester,
        faculty,
        students,
    });

    res.status(201).json({
        status: 'success',
        data: {
            subject,
        },
    });
});

exports.updateSubject = catchAsync(async (req, res, next) => {
    const filteredObj = { ...req.body };
    delete filteredObj.syllabus;
    delete filteredObj.unitId;

    let result;

    if (filteredObj) {
        result = await Subject.findByIdAndUpdate(req.params.subjectId, filteredObj, {
            new: true,
            runValidators: true,
        });
    }

    if (req.body.syllabus) {
        result = await Subject.findOneAndUpdate(
            { _id: req.params.subjectId, 'syllabus._id': req.body.syllabus.unitId },
            {
                $set: {
                    'syllabus.$.name': req.body.syllabus.name,
                    'syllabus.$.isCompleted': req.body.syllabus.isCompleted,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );
    }

    res.status(200).json({
        status: 'success',
        data: {
            subject: result,
        },
    });
});

exports.filterRequestBody = catchAsync(async (req, res, next) => {
    const subject = await Subject.findById(req.params.subjectId);
    let filteredBody;
    if (req.body.syllabus) {
        filteredBody = req.body.syllabus.filter((unit) => {
            let isExist = false;
            subject.syllabus.forEach((el) => {
                if (el.unitNumber == unit.unitNumber) {
                    isExist = true;
                }
            });
            if (!isExist) return unit;
        });

        req.body.syllabus = filteredBody;
    }

    if (req.body.faculty) {
        filteredBody = req.body.faculty.filter((el) => {
            let isExist = false;
            subject.faculty.forEach((fac) => {
                if (fac._id == el) {
                    isExist = true;
                }
            });
            if (!isExist) return el;
        });
        req.body.faculty = filteredBody;
    }
    next();
});

exports.addUnitToSyllabus = catchAsync(async (req, res, next) => {
    const result = await Subject.findByIdAndUpdate(
        req.params.subjectId,
        {
            $push: {
                syllabus: { $each: req.body.syllabus }, // $each: [ {}, {}, {}, ..... ]
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(201).json({
        status: ' success',
        data: {
            subject: result,
        },
    });
});

exports.addFacultyToSubject = catchAsync(async (req, res, next) => {
    const result = await Subject.findByIdAndUpdate(
        req.params.subjectId,
        {
            $push: {
                faculty: { $each: req.body.faculty }, // $each: [ {}, {}, {}, ..... ]
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(201).json({
        status: ' success',
        data: {
            subject: result,
        },
    });
});
