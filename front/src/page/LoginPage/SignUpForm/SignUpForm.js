import React, { Fragment } from "react";
import Button from "~/components/core/Button";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";

const SignUpForm = (props) => {
  const { signUp, showForm, register, handleSubmit, setError } = props;
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
    <form onSubmit={handleSubmit((data) => signUp(data, setError))}>
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
          <TextField
            className="text-field"
            label="Confirmation mot de passe"
            variant="outlined"
            type="password"
            name="passwordConfirm"
            inputRef={register}
          />
          {showForm && errors.passwordConfirm && (
            <p className="fieldError error">{errors.passwordConfirm.message}</p>
          )}
        </div>
        {displayMessage()}
      </Fragment>
      <Button
        type="submit"
        className="sign-in-btn"
        variant="contained"
        disabled={showForm && Boolean(Object.keys(errors).length)}
      >
        Inscription
      </Button>
    </form>
  );
};

export default SignUpForm;
