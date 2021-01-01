import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

import UserActionTypes from './user.types';
import { loginSuccess, loginFailure, logoutSuccess } from './user.actions';

const sendRequest = (method, data = null, url) => {
    return axios({
        method,
        url,
        data,
    });
};

export function* login({ payload: { email, password } }) {
    try {
        const data = {
            email,
            password,
        };
        const res = yield call(sendRequest, 'post', data, '/api/v1/users/login');

        console.log(res);

        const {
            data: {
                status,
                data: { user },
            },
        } = res;

        if (status === 'success') {
            yield put(loginSuccess(user));
        }
    } catch (err) {
        const {
            data: { message },
        } = err.response;

        yield put(loginFailure(message));
    }
}

function* logout() {
    try {
        const res = yield axios({
            method: 'get',
            url: '/api/v1/users/logout',
        });
        const {
            data: { status },
        } = res;
        if (status === 'success') yield put(logoutSuccess());
    } catch (err) {
        console.log(err.response);
    }
}

export function* onLoginStart() {
    yield takeLatest(UserActionTypes.LOGIN_START, login);
}

export function* onLogoutStart() {
    yield takeLatest(UserActionTypes.LOGOUT_START, logout);
}

export function* userSaga() {
    yield all([call(onLoginStart), call(onLogoutStart)]);
}
