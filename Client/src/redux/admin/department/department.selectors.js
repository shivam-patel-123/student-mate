import { createSelector } from 'reselect';

const selectDepartment = (state) => state.department;

export const selectAllDepartment = createSelector([selectDepartment], (department) => department.departments);

export const selectDepartmentNames = createSelector([selectAllDepartment], (departments) =>
    departments.map((department) => {
        return {
            id: department._id,
            name: department.departmentName,
        };
    })
);
