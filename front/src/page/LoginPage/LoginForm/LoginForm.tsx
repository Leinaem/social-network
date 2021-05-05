import React, { Fragment } from "react";
import Button from "../../../components/core/Button";
import TextField from "@material-ui/core/TextField";
import { useAppSelector } from "../../../redux/hooks";
import { LoginData, LoginFormProps } from '../lib';

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { signIn, showForm, register, handleSubmit, setError } = props;
  const { tmpMessage } = useAppSelector((state) => state.userLogin);
  let { errors } = props;
  console.log(errors)

  const displayMessage = () => {
    if (showForm && tmpMessage && Object.keys(tmpMessage).length) {
      return (
        <p className={`tmpMessage ${tmpMessage.type}`}>{tmpMessage.message}</p>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit((data: LoginData) => signIn(data, setError))}>
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
