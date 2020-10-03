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
    const signUp = () => {
        if (!showForm) {
            dispatch(setOpenFormAction("signUp"));
        } else {
            console.log('formulaire conforme, j\'enregistre');
            fetch("http://localhost:82/signup", {
                method: 'POST',
                body: JSON.stringify({name: "toto"}),
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log('réponse du serveur', res)
                if (res.status === 200) {
                  console.log('ok')
                } else {
                    console.log(res.statusText)
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
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <SignUpForm
            signUp={signUp}
            showForm={showForm}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
        />
    )
}

export default SignUpFormContainer;
