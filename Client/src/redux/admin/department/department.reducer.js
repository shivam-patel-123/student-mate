import departmentActionTypes from './department.types';

const INITIAL_STATE = {
    departments: [],
    error: null,
};

const depaartmentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case departmentActionTypes.GET_ALL_DEPARTMENT_SUCCESS:
            return {
                ...state,
                departments: action.payload,
            };

        case departmentActionTypes.GET_ALL_DEPARTMENT_FAILURE:
            return {
                ...state,
                departments: [],
                error: action.payload,
            };

        default:
            return state;
    }
};

export default depaartmentReducer;
