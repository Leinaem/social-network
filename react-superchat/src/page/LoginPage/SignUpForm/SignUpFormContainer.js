import React from 'react';
import SignUpForm from './SignUpForm';
import { useForm } from 'react-hook-form';
import {
    setOpenFormAction,
    setServerError
} from '../../../redux/Actions/LoginActions';
import { yupResolver } from '@hookform/resolvers';
import { useSelector, useDispatch } from 'react-redux';

const SignUpFormContainer = () => {
    const { openForm } = useSelector((state) => state.login);
    const showForm = openForm === "signUp";
    const dispatch = useDispatch();

    /**
     * Sign in function
     * @param {Array} data form data to post
     * @param {function} setError set custom error
     * @return {void}
     */
    const signUp = (data, setError) => {
        dispatch(setServerError(""));
        if (!showForm) {
            dispatch(setOpenFormAction("signUp"));
        } else {
            fetch("http://localhost:82/signup", {
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
                if (
                    res.status === 200 ||
                    res.status === 201
                    ) {
                } else if (res.status === 409) {
                    setError("pseudo", {
                        type: "manual",
                        message: res.statusText
                    });
                }
            })
            .catch(() => dispatch(setServerError('Le serveur ne répond pas, veuillez réessayer ulterieurement')));
        }
    }

    // Validation schema
    const yup = require('yup');
    const validationCriteria = showForm ? {
        pseudo: yup
            .string()
            .required("Le pseudo est requis")
            .min(3, "3 caractères minimum")
            .matches(
                /^[a-zA-Z0-9 -_]*$/,
                'Certain caractères scpéciaux ne sont pas autorisés'
            ),
        password: yup
            .string()
            .required("Le mot de passe est requis")
            .matches(
                /^[a-zA-Z0-9 -_]{8,}$/,
                '8 caractères dont majuscule, minuscule et nombre'
            ),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password'), null], "Les mots de passe doivent être identiques")
            .required("La vérification du mot de passe est requise")
    } : {}

    const schema = yup.object().shape({...validationCriteria});
    const { register, handleSubmit, errors, setError } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <SignUpForm
            signUp={signUp}
            showForm={showForm}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            setError={setError}
        />
    )
}

export default SignUpFormContainer;
