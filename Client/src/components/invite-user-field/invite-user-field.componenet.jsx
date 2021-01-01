import React from 'react';

import UserChip from '../user-chip/user-chip.component';

import './invite-user-field.styles.scss';

const InviteUserField = ({
    type,
    label,
    addedList,
    allList,
    addUserToLocalState,
    deleteUserFromLocalState,
}) => (
    <div className='invite-faculty'>
        <span className='shrink label'>{label}</span>
        <div className='faculty-list'>
            {addedList.map(({ _id, ...otherProps }) => (
                <UserChip
                    key={_id}
                    {...otherProps}
                    deleteUserFromLocalState={() => deleteUserFromLocalState(_id, type)}
                />
            ))}
        </div>
        <div className='add-button'>
            <button type='button' className='btn-add'>
                &#43;
            </button>
            <ul className='faculty-dropdown-content'>
                {allList.map(({ _id, firstName, lastName }) => (
                    <li key={_id} onClick={() => addUserToLocalState(_id, firstName, lastName, type)}>
                        {firstName} {lastName}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default InviteUserField;
