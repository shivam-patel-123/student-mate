import { createSelector } from 'reselect';

const selectFaculty = (state) => state.faculty;

export const selectAllFaculty = createSelector([selectFaculty], (faculty) => faculty.facultyList);
