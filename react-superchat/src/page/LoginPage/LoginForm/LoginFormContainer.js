import React from "react";
import LoginForm from "./LoginForm";
import { useForm } from "react-hook-form";
import {
  setLoginAction,
  fetchCurrentUser,
  setOpenFormAction,
  addTmpMessageAction,
} from "../../../redux/Actions/user/LoginActions";
import { yupResolver } from "@hookform/resolvers";
import { useSelector, useDispatch } from "react-redux";

const LoginFormContainer = () => {
  const { openForm } = useSelector((state) => state.login);
  const showForm = openForm === "login";
  const dispatch = useDispatch();

  const signIn = (data) => {
    dispatch(addTmpMessageAction(null));
    if (openForm === "signUp") {
      dispatch(setOpenFormAction("login"));
    } else {
      const { userName, password } = data;
      fetch("http://localhost:82/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // token: localStorage.getItem('token')
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.error) {
            dispatch(
              addTmpMessageAction({
                type: "error",
                message: json.error,
              })
            );
          } else if (json.userName) {
            dispatch(addTmpMessageAction(null));
            dispatch(setLoginAction(true));
            // dispatch(fetchCurrentUser(data.pseudo))
          }
        })
        .catch(() =>
          dispatch(
            addTmpMessageAction({
              type: "error",
              message: "Le serveur ne répond pas.",
            })
          )
        );
    }
  };

  // Validation schema
  const yup = require("yup");
  const validationCriteria = showForm
    ? {
        userName: yup.string().required("L'identifiant est requis"),
        password: yup.string().required("Le mot de passe est requis"),
      }
    : {};

  const schema = yup.object().shape({ ...validationCriteria });
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
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
  );
};

export default LoginFormContainer;
