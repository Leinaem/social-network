import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginForm = (props) => {
    const { login, showForm } = props;
    
    const addStyle = () => {
        if (showForm) {
            return "showForm"
        }
    
        return "hideForm";
    }
    
    return (
        <Fragment>
            <div className={addStyle()}>
                <Fragment>
                    <TextField
                        className="text-field"
                        label="Identifiant"
                        variant="outlined"
                    />
                    <TextField
                        className="text-field"
                        label="Mot de passe"
                        variant="outlined"
                        type="password"
                    />
                </Fragment>
            </div>
            <Button
            className="login-btn"
                variant="contained"
                color="primary" 
                onClick={login}
            >
                Connexion
            </Button>
        </Fragment>
    )
}

export default LoginForm;
