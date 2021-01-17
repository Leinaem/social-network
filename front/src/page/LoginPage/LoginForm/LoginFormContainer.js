import React from "react";
import LoginForm from "./LoginForm";
import { useForm } from "react-hook-form";
import {
  isLoading,
  fetchCurrentUser,
  setOpenFormAction,
  addTmpMessageAction,
} from "@redux/Actions/user/LoginActions";
import { yupResolver } from "@hookform/resolvers";
import { useSelector, useDispatch } from "react-redux";

const LoginFormContainer = () => {
  const { openForm } = useSelector((state) => state.userLogin);
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
          } else if (json.id) {
            dispatch(isLoading(true));
            dispatch(addTmpMessageAction(null));
            dispatch(fetchCurrentUser(json.id));
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(isLoading(false));
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
