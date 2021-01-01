import React from 'react';

import './button.styles.scss';

const Button = ({ children, rounded, square, ...otherProps }) => (
    <button className={`button button-primary ${rounded ? 'rounded' : ''}`} {...otherProps}>
        {children}
    </button>
);

export default Button;
