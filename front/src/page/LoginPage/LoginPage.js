import React from "react";
import LoginForm from "./LoginForm/";
import SignUpForm from "./SignUpForm/";
import { Divider } from "@material-ui/core";

const LoginPage = () => {
  return (
    <div className="login-form-container">
      <LoginForm />
      <Divider />
      <SignUpForm />
    </div>
  );
};

export default LoginPage;
