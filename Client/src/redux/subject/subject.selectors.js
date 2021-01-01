import { createSelector } from 'reselect';

const selectSubject = (state) => state.subject;

export const selectAllSubjects = createSelector([selectSubject], (subject) => subject.subjects);
