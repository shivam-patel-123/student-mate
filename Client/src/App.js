import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LandingPage from './pages/landing-page/landing-page.component';
import LoginPage from './pages/login-page/login-page.component';
import Dashboard from './pages/dashboard/dashboard.component';

import { selectCurrentUser } from './redux/user/user.selectors';

import './App.scss';

const App = ({ currentUser }) => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route
                    exact
                    path='/login'
                    render={() => (currentUser ? <Redirect to='/dashboard' /> : <LoginPage />)}
                />
                <Route path='/dashboard' render={() => (currentUser ? <Dashboard /> : <Redirect to='/' />)} />
            </Switch>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
