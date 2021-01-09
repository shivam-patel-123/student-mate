import { all, call } from 'redux-saga/effects';

import { userSaga } from './user/user.sagas';
import { subjectSaga } from './subject/subject.sagas';
import { facultySaga } from './faculty/faculty.sagas';
import { studentSaga } from './student/student.sagas';
import { departmentSaga } from './admin/department/department.sagas';

function* rootSaga() {
    yield all([
        call(userSaga),
        call(subjectSaga),
        call(facultySaga),
        call(studentSaga),
        call(departmentSaga),
    ]);
}

export default rootSaga;
