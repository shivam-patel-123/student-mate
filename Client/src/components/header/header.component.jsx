import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import ProfileDropdown from '../profile-dropdown/profile-dropdown.component';
import ProfileDetails from '../profile-details/profile-details.component';

import { selectToggleProfileDropdown } from '../../redux/header/header.selectors';

import './header.styles.scss';

const Header = ({ isProfileDropdownHidden }) => {
    const [searchText, setSearchText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Get the data for the entered string.
    };

    return (
        <div className='header'>
            <form className='header__search-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='search'
                    label='Search'
                    value={searchText}
                    handleChange={(e) => setSearchText(e.target.value)}
                    rounded={true}
                />
            </form>
            <div className='header__profile'>
                <ProfileDetails />
            </div>
            {isProfileDropdownHidden ? null : <ProfileDropdown />}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    isProfileDropdownHidden: selectToggleProfileDropdown,
});

export default connect(mapStateToProps)(Header);
