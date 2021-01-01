import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { loginStart } from '../../redux/user/user.actions';
import { selectIsStudent } from '../../redux/user/user.selectors';

import './login.styles.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { loginStart } = this.props;
        const { email, password } = this.state;

        loginStart({ email, password });
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    render() {
        const { email, password } = this.state;
        return (
            <div className='login'>
                <h1 className='heading-h2 heading-h1--login'>Enter Login Credentials</h1>
                <form className='login-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        handleChange={this.handleChange}
                        label='Email Id'
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        handleChange={this.handleChange}
                        label='Password'
                    />
                    <Button type='submit'>Login</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isStudent: selectIsStudent,
});

const mapDispatchToProps = (dispatch) => ({
    loginStart: (userAuthenticationData) => dispatch(loginStart(userAuthenticationData)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
