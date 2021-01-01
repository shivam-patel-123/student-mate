import FacultyActionTypes from './faculty.types';

export const getAllFacultyStart = () => ({
    type: FacultyActionTypes.GET_ALL_FACULTY_START,
});

export const getAllFacultySuccess = (faculty) => ({
    type: FacultyActionTypes.GET_ALL_FACULTY_SUCCESS,
    payload: faculty,
});

export const getAllFacultyFailure = (error) => ({
    type: FacultyActionTypes.GET_ALL_FACULTY_FAILURE,
    payload: error,
});
