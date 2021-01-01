import React from 'react';
import { connect } from 'react-redux';

import { logoutStart } from '../../redux/user/user.actions';

import './profile-dropdown.styles.scss';

const ProfileDropdown = ({ logoutStart }) => (
    <div className='header__profile-dropdown'>
        <span className='heading heading-small'>Settings</span>
        <span className='heading heading-small' onClick={logoutStart}>
            Logout
        </span>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    logoutStart: () => dispatch(logoutStart()),
});

export default connect(null, mapDispatchToProps)(ProfileDropdown);
