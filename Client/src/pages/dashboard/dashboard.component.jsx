import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from '../../components/navigation/navigation.component';
import Home from '../../components/home/home.component';
import Header from '../../components/header/header.component';
import Subjects from '../../components/subjects/subjects.component';

import './dashboard.styles.scss';

const Dashboard = () => (
    <div className='dashboard'>
        <div className='dashboard__navigation'>
            <Navigation />
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

export default Dashboard;
