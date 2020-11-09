import React from 'react';
import LoginForm from './LoginForm';
import { useForm } from 'react-hook-form';
import {
    setLoginAction,
    setOpenFormAction,
    addTmpMessageAction
} from '../../../redux/Actions/LoginActions';
import { yupResolver } from '@hookform/resolvers';
import { useSelector, useDispatch } from 'react-redux';

const LoginFormContainer = () => {
    const { openForm } = useSelector((state) => state.login);
    const showForm = openForm === "login";
    const dispatch = useDispatch();

    const signIn = (data) => {
        dispatch(addTmpMessageAction(null));
        if (openForm === "signUp") {
            dispatch(setOpenFormAction("login"));
        } else {
            fetch("http://localhost:82/signin", {
                method: 'POST',
                body: JSON.stringify({
                    name: data.pseudo,
                    password: data.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }      
            })
            .then((res) => {
                if (res.status === 405) {
                    dispatch(addTmpMessageAction({
                        type: 'error',
                        message: res.statusText
                    }))
                } else if (
                    res.status === 200 ||
                    res.status === 201
                ) {
                    dispatch(addTmpMessageAction(null));
                    dispatch(setLoginAction(true));
                }
            })
            .catch(() => dispatch(addTmpMessageAction({
                type: 'error',
                message: 'Le serveur ne répond pas.'
            })));            
        }
    }

    // Validation schema
    const yup = require('yup');
    const validationCriteria = showForm ? {
        pseudo: yup
            .string()
            .required("Le pseudo est requis"),
        password: yup
            .string()
            .required("Le mot de passe est requis")
    } : {}

    const schema = yup.object().shape({...validationCriteria});
    const { register, handleSubmit, errors, setError } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <LoginForm
            signIn={signIn}
            showForm={showForm}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            setError={setError}
        />
    )
}

export default LoginFormContainer;
