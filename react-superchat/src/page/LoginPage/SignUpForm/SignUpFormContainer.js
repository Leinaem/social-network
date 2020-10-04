import React from 'react';
import SignUpForm from './SignUpForm';
import { setOpenFormAction } from '../../../redux/Actions/LoginActions';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

const SignUpFormContainer = () => {
    const { openForm } = useSelector((state) => state.login);
    const showForm = openForm === "signUp";
    const dispatch = useDispatch();
    
    /**
     * Sign in function
     * @param {*} data
     * @return {void}
     */
    const signUp = (data, setError) => {
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
