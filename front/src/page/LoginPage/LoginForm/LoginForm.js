import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const LoginForm = (props) => {
  const { signIn, showForm, register, handleSubmit, setError } = props;
  const { tmpMessage } = useSelector((state) => state.userLogin);
  let { errors } = props;

  const displayMessage = () => {
    if (showForm && tmpMessage && Object.keys(tmpMessage).length) {
      return (
        <p className={`tmpMessage ${tmpMessage.type}`}>{tmpMessage.message}</p>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit((data) => signIn(data, setError))}>
      <Fragment>
        <div className={!showForm ? "hideForm" : "showForm"}>
          <TextField
            className="text-field"
            label="Identifiant"
            variant="outlined"
            name="userName"
            inputRef={register}
          />
          {showForm && errors.userName && (
            <p className="fieldError error">{errors.userName.message}</p>
          )}
          <TextField
            className="text-field"
            label="Mot de passe"
            variant="outlined"
            type="password"
            name="password"
            inputRef={register}
          />
          {showForm && errors.password && (
            <p className="fieldError error">{errors.password.message}</p>
          )}
        </div>
        {displayMessage()}
      </Fragment>
      <Button type="submit" variant="contained" color="primary">
        Connexion
      </Button>
    </form>
  );
};

export default LoginForm;
