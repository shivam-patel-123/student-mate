import departmentActionTypes from './department.types';

export const getAllDepartmentStart = () => ({
    type: departmentActionTypes.GET_ALL_DEPARTMENT_START,
});

export const getAllDepartmentSuccess = (departments) => ({
    type: departmentActionTypes.GET_ALL_DEPARTMENT_SUCCESS,
    payload: departments,
});

export const getAllDepartmentFailure = (error) => ({
    type: departmentActionTypes.GET_ALL_DEPARTMENT_FALURE,
    payload: error,
});
