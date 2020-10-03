import React, { useState } from 'react';
import LoginPage from './LoginPage';

const LoginPageContainer = () => {
        const [action, setAction] = useState("login");

        return <LoginPage action={action} setAction={setAction}/>

}

export default LoginPageContainer;
