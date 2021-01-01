import FacultyActionTypes from './faculty.types';

const INITIAL_STATE = {
    facultyList: [],
    error: null,
};

const facultyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FacultyActionTypes.GET_ALL_FACULTY_SUCCESS:
            return {
                ...state,
                error: null,
                facultyList: [...action.payload],
            };

        case FacultyActionTypes.GET_ALL_FACULTY_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default facultyReducer;
