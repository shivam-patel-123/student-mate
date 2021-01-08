import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/button/button.component';

import { setIsStudent, setIsFaculty } from '../../redux/user/user.actions';

import './landing-page.styles.scss';

const LandingPage = ({ setIsStudent, setIsFaculty }) => (
    <div className='home-page'>
        <Link to='/login'>
            <Button type='button' onClick={setIsStudent}>
                Login As Student
            </Button>
        </Link>
        <Link to='/login'>
            <Button type='button' onClick={setIsFaculty}>
                Login As Faculty
            </Button>
        </Link>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    setIsStudent: () => dispatch(setIsStudent()),
    setIsFaculty: () => dispatch(setIsFaculty()),
});

export default connect(null, mapDispatchToProps)(LandingPage);
