import React from 'react';
import '../../stylesheets/components/Login.scss'
import { Divider } from '@material-ui/core';

import LoginForm from './LoginForm/';
import SignUpForm from './SignUpForm/';

const LoginPage = () => {
    return (
        <div className="login-form-container">
            <LoginForm />
            <Divider />
            <SignUpForm />
        </div>
    )
}

export default LoginPage;
