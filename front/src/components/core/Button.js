import React from "react";
import MuiButton from "@material-ui/core/Button";

const Button = (props) => {
  const { children, ...other } = props;
  // variant, color, type, disabled, onClick
  return <MuiButton {...other}>{children}</MuiButton>;
};

export default Button;
