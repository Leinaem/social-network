import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

const LoginForm = (props) => {
    const { signIn, showForm, register, handleSubmit, setError } = props;
    let { errors } = props;
    
    const { serverError } = useSelector((state) => state.login);

    const addStyle = () => {
        if (showForm) {
            return "showForm"
        }
    
        errors = {};
        return "hideForm";
    }
    
    return (
        <form onSubmit={handleSubmit((data) => signIn(data, setError))}>
            <Fragment>
                <div className={addStyle()}>
                    <TextField
                        className="text-field"
                        label="Identifiant"
                        variant="outlined"
                        name="pseudo"
                        inputRef={register}
                    />
                    {errors.pseudo && <p className="error">{errors.pseudo.message}</p>}
                    <TextField
                        className="text-field"
                        label="Mot de passe"
                        variant="outlined"
                        type="password"
                        name="password"
                        inputRef={register}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                {showForm && Boolean(serverError.length) &&
                    <div className="errorServerContainer">
                        <p className="errorServer">{serverError}</p>
                    </div>
                }
            </Fragment>
            <Button
                type="submit"
                className="login-btn"
                variant="contained"
                color="primary" 
            >
                Connexion
            </Button>
        </form>
    )
}

export default LoginForm;
