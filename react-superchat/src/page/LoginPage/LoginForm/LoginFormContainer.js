import React from 'react';
import LoginForm from './LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenFormAction, setLoginAction } from '../../../redux/Actions/LoginActions';

const LoginFormContainer = () => {
    const { openForm } = useSelector((state) => state.login);
    const showForm = openForm === "login";
    const dispatch = useDispatch();

    const login = () => {
        if (openForm === "signUp") {
            dispatch(setOpenFormAction("login"));
        } else {
            // LOGIN PROCEDURE
            console.log('connection');
            // si tout est ok, on connecte le user
            dispatch(setLoginAction(true));
        }
    }

    return <LoginForm login={login} showForm={showForm} />
}

export default LoginFormContainer;
