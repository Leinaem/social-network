import React from "react";
import MuiButton from "@material-ui/core/Button";
import { ButtonProps } from "@material-ui/core";

interface buttonProps extends ButtonProps {}

const Button: React.FC<buttonProps> = (props) => {
  const { children, ...other } = props;

  return (
    <MuiButton {...other}>{children}</MuiButton>
  );
};

export default Button;
