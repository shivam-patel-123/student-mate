import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/button/button.component';

import { setIsStudent, setIsFaculty } from '../../redux/user/user.actions';

import './landing-page.styles.scss';

const LandingPage = ({ setIsStudent, setIsFaculty }) => (
    <div className='home-page'>
        <Button type='button' onClick={setIsStudent}>
            <Link to='/login'>Login As Student</Link>
        </Button>
        <Button type='button'>
            <Link to='/login' onClick={setIsFaculty}>
                Login As Faculty
            </Link>
        </Button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    setIsStudent: () => dispatch(setIsStudent()),
    setIsFaculty: () => dispatch(setIsFaculty()),
});

export default connect(null, mapDispatchToProps)(LandingPage);
