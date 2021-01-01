import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../../form-input/form-input.component';
import Button from '../../button/button.component';
import InviteUserField from '../../invite-user-field/invite-user-field.componenet';

import { getAllFacultyStart } from '../../../redux/faculty/faculty.actions';
import { selectAllFaculty } from '../../../redux/faculty/faculty.selectors';
import { selectAllStudents } from '../../../redux/student/student.selectors';
import { addSubjectStart } from '../../../redux/subject/subject.actions';

import './add-subject.styles.scss';

Modal.setAppElement('#root');

class AddSubjectModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subName: '',
            subSem: 1,
            faculty: [],
            students: [],
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    addUserToLocalState = (_id, fn, ln, name) => {
        const { faculty, students } = this.state;
        let isExist;
        if (name === 'faculty') {
            isExist = faculty.find((faculty) => _id === faculty._id);
            if (isExist) return;
            return this.setState((prevState) => ({
                [name]: [...prevState.faculty, { name: `${fn} ${ln}`, _id }],
            }));
        } else if (name === 'students') {
            isExist = students.find((student) => _id === student._id);
            if (isExist) return;
            return this.setState((prevState) => ({
                [name]: [...prevState.students, { name: `${fn} ${ln}`, _id }],
            }));
        }
    };

    deleteUserFromLocalState = (_id, name) => {
        const { faculty, students } = this.state;
        let map;
        if (name === 'faculty') {
            map = faculty.filter((faculty) => faculty._id !== _id);
        } else if (name === 'students') {
            map = students.filter((student) => student._id !== _id);
        }
        return this.setState({ [name]: map });
    };

    render() {
        const {
            modalIsOpen,
            handleClose,
            handleRequestClose,
            facultyList,
            studentsList,
            addSubjectStart,
        } = this.props;
        const { subName, subSem, faculty, students } = this.state;
        return (
            <Modal
                className='content'
                overlayClassName='overlay'
                isOpen={modalIsOpen}
                onRequestClose={handleRequestClose}
            >
                <div className='modal__add-subject--header'>
                    <h2 className='heading heading-h2'>Create New Subject</h2>
                    <button onClick={handleClose}>close</button>
                </div>

                <form className='modal__add-subject--content'>
                    <div className='general-details'>
                        <FormInput
                            name='subName'
                            type='text'
                            value={subName}
                            label='Subject Name'
                            handleChange={this.handleChange}
                        />
                        <FormInput
                            name='subSem'
                            type='number'
                            min='1'
                            max='8'
                            value={subSem}
                            label='Semester'
                            handleChange={this.handleChange}
                            shrink
                        />
                    </div>
                    <InviteUserField
                        label='Invite Faculty'
                        type='faculty'
                        addedList={faculty}
                        allList={facultyList}
                        addUserToLocalState={this.addUserToLocalState}
                        deleteUserFromLocalState={this.deleteUserFromLocalState}
                    />
                    <InviteUserField
                        label='Invite Students'
                        type='students'
                        addedList={students}
                        allList={studentsList}
                        addUserToLocalState={this.addUserToLocalState}
                        deleteUserFromLocalState={this.deleteUserFromLocalState}
                    />
                </form>
                <Button
                    type='button'
                    onClick={() => {
                        const subjectData = {
                            name: subName,
                            semester: subSem,
                            faculty: faculty.map((el) => el._id),
                            students: students.map((el) => el._id),
                        };
                        addSubjectStart(subjectData);
                        this.setState({
                            subName: '',
                            subSem: 1,
                            faculty: [],
                            students: [],
                        });
                    }}
                >
                    Add Now
                </Button>
            </Modal>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    facultyList: selectAllFaculty,
    studentsList: selectAllStudents,
});

const mapDispatchToProps = (dispatch) => ({
    getAllFacultyStart: () => dispatch(getAllFacultyStart()),
    addSubjectStart: (data) => dispatch(addSubjectStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSubjectModal);
