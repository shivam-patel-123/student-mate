import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import {
    addSubjectSuccess,
    addSubjectFailure,
    getAllSubjectsSuccess,
    getAllSubjectsFailure,
} from './subject.actions';

import SubjectActionTypes from './subject.types';

function* addSubject({ payload: { name, semester, faculty, students } }) {
    try {
        const res = yield axios({
            method: 'post',
            url: '/api/v1/subjects',
            data: {
                name,
                semester,
                faculty,
                students,
            },
        });
        const {
            data: {
                status,
                data: { subject },
            },
        } = res;

        if (status === 'success') {
            yield put(addSubjectSuccess(subject));
        }
    } catch (err) {
        const {
            data: { message },
        } = err.response;
        yield put(addSubjectFailure(message));
    }
}

function* getAllSubjects() {
    try {
        const res = yield axios({
            method: 'get',
            url: '/api/v1/subjects',
        });

        const {
            data: {
                status,
                data: { subjects },
            },
        } = res;

        if (status === 'success') yield put(getAllSubjectsSuccess(subjects));
    } catch (err) {
        const {
            data: { message },
        } = err.response;

        yield put(getAllSubjectsFailure(message));
    }
}

export function* onAddSubjectStart() {
    yield takeLatest(SubjectActionTypes.ADD_SUBJECT_START, addSubject);
}

export function* onGetAllSubjectsStart() {
    yield takeLatest(SubjectActionTypes.GET_ALL_SUBJECTS_START, getAllSubjects);
}

export function* subjectSaga() {
    yield all([call(onAddSubjectStart), call(onGetAllSubjectsStart)]);
}
