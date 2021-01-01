import StudentActionTypes from './student.types';

export const getAllStudentsStart = () => ({
    type: StudentActionTypes.GET_ALL_STUDENTS_START,
});

export const getAllStudentsSuccess = (student) => ({
    type: StudentActionTypes.GET_ALL_STUDENTS_SUCCESS,
    payload: student,
});

export const getAllStudentsFailure = (error) => ({
    type: StudentActionTypes.GET_ALL_STUDENTS_FAILURE,
    payload: error,
});
