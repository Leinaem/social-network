import React from "react";
import SignUpForm from "./SignUpForm";
import { useForm } from "react-hook-form";
import {
  setOpenFormAction,
  addTmpMessageAction,
} from "@redux/Actions/user/LoginActions";
import { yupResolver } from "@hookform/resolvers";
import { useSelector, useDispatch } from "react-redux";

const SignUpFormContainer = () => {
  const { openForm } = useSelector((state) => state.userLogin);
  const showForm = openForm === "signUp";
  const dispatch = useDispatch();

  /**
   * Sign in function
   * @param {Array} data form data to post
   * @param {function} setError set custom error
   * @return {void}
   */
  const signUp = (data, setError) => {
    dispatch(addTmpMessageAction(null));
    if (!showForm) {
      dispatch(setOpenFormAction("signUp"));
    } else {
      const { userName, password } = data;
      fetch("http://localhost:82/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.error) {
            setError("userName", {
              type: "manual",
              message: json.error,
            });
          } else if (json.success) {
            dispatch(setOpenFormAction("login"));
            dispatch(
              addTmpMessageAction({
                type: "success",
                message: json.success,
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(
            addTmpMessageAction({
              type: "error",
              message: "Le serveur ne répond pas.",
            })
          );
        });
    }
  };

  // Validation schema
  const yup = require("yup");
  const validationCriteria = showForm
    ? {
        userName: yup
          .string()
          .required("Le pseudo est requis")
          .min(3, "3 caractères minimum")
          .matches(
            /^[a-zA-Z0-9 -_]*$/,
            "Certain caractères scpéciaux ne sont pas autorisés"
          ),
        password: yup
          .string()
          .required("Le mot de passe est requis")
          .matches(
            /^[a-zA-Z0-9 -_]{8,}$/,
            "8 caractères dont majuscule, minuscule et nombre"
          ),
        passwordConfirm: yup
          .string()
          .oneOf(
            [yup.ref("password"), null],
            "Les mots de passe doivent être identiques"
          )
          .required("La vérification du mot de passe est requise"),
      }
    : {};

  const schema = yup.object().shape({ ...validationCriteria });
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
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
  );
};

export default SignUpFormContainer;
