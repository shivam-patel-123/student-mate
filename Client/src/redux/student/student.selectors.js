import { createSelector } from 'reselect';

const selectStudent = (state) => state.student;

export const selectAllStudents = createSelector([selectStudent], (student) => student.studentsList);
