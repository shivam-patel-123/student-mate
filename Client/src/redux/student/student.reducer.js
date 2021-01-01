import StudentActionTypes from './student.types';

const INITIAL_STATE = {
    studentsList: [],
    error: null,
};

const studentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StudentActionTypes.GET_ALL_STUDENTS_SUCCESS:
            return {
                ...state,
                error: null,
                studentsList: [...action.payload],
            };

        case StudentActionTypes.GET_ALL_STUDENTS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default studentReducer;
