import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../button/button.component';
import SubjectItem from '../subject-item/subject-item.component';

import { selectIsStudent } from '../../redux/user/user.selectors';
import { getAllFacultyStart } from '../../redux/faculty/faculty.actions';
import { getAllStudentsStart } from '../../redux/student/student.actions';
import { getAllSubjectsStart } from '../../redux/subject/subject.actions';
import { selectAllSubjects } from '../../redux/subject/subject.selectors';

import './subjects.styles.scss';
import AddSubjectModal from '../modals/add-subject/add-subject.component';

class Subjects extends React.Component {
    constructor() {
        super();

        this.state = {
            activeSubject: null,
            modalIsOpen: false,
            subjects: [
                {
                    name: 'compiler design',
                    _id: 4,
                },
            ],
        };
    }

    componentDidMount() {
        const { getAllSubjectsStart } = this.props;
        getAllSubjectsStart();
    }

    setIsOpen = (value) => {
        this.setState({ modalIsOpen: value });
    };

    render() {
        const { isStudent, getAllFacultyStart, getAllStudentsStart, subjects } = this.props;
        const { activeSubject, modalIsOpen } = this.state;
        return (
            <div className='subjects'>
                <div className='subjects__header'>
                    <h1 className='heading-h1'>All Subjects</h1>
                    <Button
                        type='button'
                        disabled={isStudent}
                        onClick={() => {
                            this.setIsOpen(true);
                            getAllFacultyStart();
                            getAllStudentsStart();
                        }}
                    >
                        Add New Subject
                    </Button>
                </div>
                <div className='subjects__content'>
                    <ul className='subjects-list'>
                        {subjects.map(({ _id, ...otherProps }) => (
                            <SubjectItem
                                key={_id}
                                {...otherProps}
                                active={_id === activeSubject}
                                setSubjectAsActive={() => this.setState({ activeSubject: _id })}
                            />
                        ))}
                    </ul>
                    <div className='subject-details--selected'>Subject Details will go here...</div>
                </div>
                <AddSubjectModal
                    className='modal'
                    modalIsOpen={modalIsOpen}
                    handleClose={() => this.setIsOpen(false)}
                    handleRequestClose={() => this.setIsOpen(false)}
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isStudent: selectIsStudent,
    subjects: selectAllSubjects,
});

const mapDispatchToProps = (dispatch) => ({
    getAllFacultyStart: () => dispatch(getAllFacultyStart()),
    getAllStudentsStart: () => dispatch(getAllStudentsStart()),
    getAllSubjectsStart: () => dispatch(getAllSubjectsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
