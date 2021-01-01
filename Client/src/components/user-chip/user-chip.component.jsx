import React from 'react';

import './user-chip.styles.scss';

const UserChip = ({ name, deleteFacultyFromLocalState }) => (
    <div className='faculty'>
        <div className='faculty-photo' />
        <h5 className='heading heading-h5'>{name}</h5>
        <div className='delete' onClick={deleteFacultyFromLocalState}>
            &#10005;
        </div>
    </div>
);

export default UserChip;
