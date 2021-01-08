import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from '../../components/navigation/navigation.component';
import Home from '../../components/home/home.component';
import Header from '../../components/header/header.component';
import Subjects from '../../components/subjects/subjects.component';

import './dashboard.styles.scss';

const Dashboard = () => {
    const [menuItems, useMenuItems] = useState([
        {
            id: 1,
            name: 'home',
            title: 'Home',
            route: '/dashboard',
            icon: 'home',
        },
        {
            id: 2,
            name: 'all-subjects',
            title: 'All Subjects',
            route: '/dashboard/subjects',
            icon: 'subjects',
        },
        {
            id: 3,
            name: 'chats',
            title: 'Chats',
            route: '/dashboard/chats',
            icon: 'chats',
        },
        {
            id: 4,
            name: 'notice-board',
            title: 'Notice Board',
            route: '/dashboard/notice',
            icon: 'noticeBoard',
        },
    ]);

    return (
        <div className='dashboard'>
            <div className='dashboard__navigation'>
                <Navigation menuItems={menuItems} />
            </div>
            <div className='dashboard__header'>
                <Header />
            </div>
            <div className='dashboard__content'>
                <Switch>
                    <Route exact path='/dashboard' component={Home} />
                    <Route path='/dashboard/subjects' component={Subjects} />
                    <Route path='/dashboard/chats' component={Home} />
                    <Route path='/dashboard/notice' component={Home} />
                </Switch>
            </div>
        </div>
    );
};

export default Dashboard;
