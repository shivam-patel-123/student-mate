import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    errorMessage: null,
    isStudent: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                errorMessage: null,
                currentUser: action.payload,
            };

        case UserActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                currentUser: null,
                errorMessage: action.payload,
            };

        case UserActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                errorMessage: null,
                currentUser: null,
            };

        case UserActionTypes.LOGOUT_FAILURE:
            return {
                ...state,
                currentUser: null,
                errorMessage: 'Logout Failed!',
            };

        case UserActionTypes.SET_IS_STUDENT:
            return {
                ...state,
                isStudent: true,
            };

        case UserActionTypes.SET_IS_FACULTY:
            return {
                ...state,
                isStudent: false,
            };

        default:
            return state;
    }
};

export default userReducer;
