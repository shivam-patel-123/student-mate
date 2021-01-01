import SubjectActionTypes from './subject.types';

const INITIAL_STATE = {
    subjects: [],
    errorMessage: null,
};

const subjectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SubjectActionTypes.ADD_SUBJECT_SUCCESS:
            return {
                ...state,
                errorMessage: null,
                subjects: [...state.subjects, action.payload],
            };

        case SubjectActionTypes.ADD_SUBJECT_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
            };

        case SubjectActionTypes.GET_ALL_SUBJECTS_SUCCESS:
            return {
                ...state,
                errorMessage: null,
                subjects: action.payload,
            };

        case SubjectActionTypes.GET_ALL_SUBJECTS_FAILURE:
            return {
                ...state,
                subjects: [],
                errorMessage: action.payload,
            };

        default:
            return state;
    }
};

export default subjectReducer;
