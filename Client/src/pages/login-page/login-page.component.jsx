import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../Assets/Logo.svg';
import Login from '../../components/login/login.component';

import './login-page.styles.scss';

const LoginPage = ({ admin }) => (
    <div className='login-page'>
        <div className='login-page__header'>
            <Link to='/'>{admin ? 'ADMIN' : <Logo className='login-page__header-logo' />}</Link>
        </div>
        <div className='login-page__content'>
            <Login />
        </div>
    </div>
);

export default LoginPage;
