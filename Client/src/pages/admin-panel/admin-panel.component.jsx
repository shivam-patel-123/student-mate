import React, { useState } from 'react';

import Navigation from '../../components/navigation/navigation.component';

import './admin-panel.styles.scss';

const AdminPanel = () => {
    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            name: 'computer-engineering',
            title: 'Computer Engineering',
            route: '/computer-engineering',
        },
        {
            id: 2,
            name: 'chemical-engineering',
            title: 'Chemical Engineering',
            route: '/chemical-engineering',
        },
    ]);

    return (
        <div className='admin-panel'>
            <div className='dashboard__navigation'>
                <Navigation menuItems={menuItems} />
            </div>
            <div className='dashboard__header'></div>
            <div className='dashboard__content'></div>
        </div>
    );
};

export default AdminPanel;
