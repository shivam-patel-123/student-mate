import { takeLatest, call, all, put } from 'redux-saga/effects';
import axios from 'axios';

import StudentActionTypes from './student.types';
import { getAllStudentsSuccess, getAllStudentsFailure } from './student.actions';

function* getAllStudent() {
    try {
        const res = yield axios({
            method: 'get',
            url: `/api/v1/users/students`,
        });

        const {
            data: {
                status,
                data: { students },
            },
        } = res;

        if (status === 'success') yield put(getAllStudentsSuccess(students));
    } catch (err) {
        const {
            data: { message },
        } = err.response;
        yield put(getAllStudentsFailure(message));
    }
}

export function* onGetAllStudentsStart() {
    yield takeLatest(StudentActionTypes.GET_ALL_STUDENTS_START, getAllStudent);
}

export function* studentSaga() {
    yield all([call(onGetAllStudentsStart)]);
}
