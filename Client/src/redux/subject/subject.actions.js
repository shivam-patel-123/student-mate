import SubjectActionTypes from './subject.types';

export const addSubjectStart = (subjectData) => ({
    type: SubjectActionTypes.ADD_SUBJECT_START,
    payload: subjectData,
});

export const addSubjectSuccess = (subject) => ({
    type: SubjectActionTypes.ADD_SUBJECT_SUCCESS,
    payload: subject,
});

export const addSubjectFailure = (error) => ({
    type: SubjectActionTypes.ADD_SUBJECT_FAILURE,
    payload: error,
});

export const getAllSubjectsStart = () => ({
    type: SubjectActionTypes.GET_ALL_SUBJECTS_START,
});

export const getAllSubjectsSuccess = (subjects) => ({
    type: SubjectActionTypes.GET_ALL_SUBJECTS_SUCCESS,
    payload: subjects,
});

export const getAllSubjectsFailure = (error) => ({
    type: SubjectActionTypes.GET_ALL_SUBJECTS_FAILURE,
    payload: error,
});
