import React from "react";
import { Divider } from "@material-ui/core";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="login-form-container">
      <LoginForm />
      <Divider />
      <SignUpForm />
    </div>
  );
};

export default LoginPage;
