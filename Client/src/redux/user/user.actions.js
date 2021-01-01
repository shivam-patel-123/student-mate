import UserActionTypes from './user.types';

// ---------- LOGIN ----------
export const loginStart = (userAuthenticationData) => ({
    type: UserActionTypes.LOGIN_START,
    payload: userAuthenticationData,
});

export const loginSuccess = (user) => ({
    type: UserActionTypes.LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (errorMessage) => ({
    type: UserActionTypes.LOGIN_FAILURE,
    payload: errorMessage,
});

// ---------- LOGOUT ----------
export const logoutStart = () => ({
    type: UserActionTypes.LOGOUT_START,
});

export const logoutSuccess = () => ({
    type: UserActionTypes.LOGOUT_SUCCESS,
});

export const logoutFailure = () => ({
    type: UserActionTypes.LOGOUT_FAILURE,
});

// ---------- SET USER ----------
export const setIsStudent = () => ({
    type: UserActionTypes.SET_IS_STUDENT,
});

export const setIsFaculty = () => ({
    type: UserActionTypes.SET_IS_FACULTY,
});
