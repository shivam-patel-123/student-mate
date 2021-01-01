import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, route, match, location }) => {
    const active = route === location.pathname;
    return (
        <li className={`${active ? 'active' : ''} item`}>
            <Link to={route}>{title}</Link>
        </li>
    );
};

export default withRouter(MenuItem);
