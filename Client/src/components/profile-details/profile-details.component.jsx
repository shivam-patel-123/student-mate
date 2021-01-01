import React from 'react';
import { connect } from 'react-redux';

import { toggleProfileDropdown } from '../../redux/header/header.actions';

import './profile-details.styles.scss';

const ProfileDetails = ({ toggleProfileDropdown }) => (
    <div className='header__profile-details' onClick={toggleProfileDropdown}>
        <div className='header__profile-details--photo' />
        <div className='header__profile-details--info'>
            <h5 className='heading-h5'>Shivam P</h5>
            <span className='heading-small'>CSE SEM-7</span>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    toggleProfileDropdown: () => dispatch(toggleProfileDropdown()),
});

export default connect(null, mapDispatchToProps)(ProfileDetails);
