import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, rounded, shrink, ...otherProps }) => (
    <div className='group'>
        <input
            className={`${rounded ? 'round' : ''} form-input`}
            onChange={handleChange ? handleChange : () => {}}
            {...otherProps}
        />
        {label ? (
            <label className={`${otherProps.value.length || shrink ? 'shrink' : ''} label`}>{label}</label>
        ) : null}
    </div>
);

export default FormInput;
