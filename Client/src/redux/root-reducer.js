import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import headerReducer from './header/header.reducer';
import subjectReducer from './subject/subject.reducers';
import facultyReducer from './faculty/faculty.reducer';
import studentReducer from './student/student.reducer';
import departmentReducer from './admin/department/department.reducer';

const config = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    user: userReducer,
    header: headerReducer,
    subject: subjectReducer,
    faculty: facultyReducer,
    student: studentReducer,
    department: departmentReducer,
});

export default persistReducer(config, rootReducer);
