import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from '../../../redux/hooks'; 
import { fetchCurrentUser } from "../../../redux/lib";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import LoginForm from "./LoginForm";
import {
  isLoading,
  setOpenFormAction,
  addTmpMessageAction,
} from "../../../redux/loginSlice";
import { LoginData } from '../lib';

const LoginFormContainer: React.FC = () => {
  const { openForm } = useAppSelector((state) => state.userLogin);
  const showForm = openForm === "login";
  const dispatch = useDispatch();

  const signIn = (data: LoginData) => {
    dispatch(addTmpMessageAction(null));
    if (openForm === "signUp") {
      dispatch(setOpenFormAction("login"));
    } else {
      const { userName, password } = data;
      fetch("/signin", {
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
