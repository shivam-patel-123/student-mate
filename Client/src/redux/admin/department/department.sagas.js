import { takeLatest, all, call, put } from 'redux-saga/effects';
import axios from 'axios';

import departmentActionTypes from './department.types';
import { getAllDepartmentSuccess, getAllDepartmentFailure } from './department.actions';

function* getAllDepartment() {
    try {
        const res = yield axios({
            method: 'get',
            url: '/api/v1/departments',
        });

        const {
            data: {
                status,
                data: { departments },
            },
        } = res;

        if (status === 'success') yield put(getAllDepartmentSuccess(departments));
    } catch (error) {
        const {
            data: { message },
        } = error.response;
        yield put(getAllDepartmentFailure(message));
    }
}

export function* onGetAllDepartmentStart() {
    yield takeLatest(departmentActionTypes.GET_ALL_DEPARTMENT_START, getAllDepartment);
}

export function* departmentSaga() {
    yield all([call(onGetAllDepartmentStart)]);
}
