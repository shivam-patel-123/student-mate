import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

import FacultyActionTypes from './faculty.types';
import { getAllFacultySuccess, getAllFacultyFailure } from './faculty.actions';

function* getAllFaculty() {
    try {
        const res = yield axios({
            method: 'get',
            url: `/api/v1/users/faculty`,
        });

        const {
            data: {
                status,
                data: { faculty },
            },
        } = res;

        if (status === 'success') yield put(getAllFacultySuccess(faculty));
    } catch (error) {
        yield put(getAllFacultyFailure(error));
    }
}

export function* onGetAllFaculty() {
    yield takeLatest(FacultyActionTypes.GET_ALL_FACULTY_START, getAllFaculty);
}

export function* facultySaga() {
    yield all([call(onGetAllFaculty)]);
}
