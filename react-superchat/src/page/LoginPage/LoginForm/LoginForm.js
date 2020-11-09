import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setUserNameAction } from '../../../redux/Actions/LoginActions';

const LoginForm = (props) => {
    const { signIn, showForm, register, handleSubmit, setError } = props;
    const { userName, tmpMessage } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    let { errors } = props;

    const addStyle = () => {
        if (showForm) {
            return "showForm"
        }
    
        errors = {};
        return "hideForm";
    }

    const displayMessage = () => {
        if (showForm && tmpMessage && Object.keys(tmpMessage).length) {
            return <p className={`tmpMessage ${tmpMessage.type}`}>{tmpMessage.message}</p>
        } else {
            return null
        }
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
                        onChange={(e) => dispatch(setUserNameAction(e.target.value))}
                        value={userName}
                    />
                    {errors.pseudo && <p className="fieldError error">{errors.pseudo.message}</p>}
                    <TextField
                        className="text-field"
                        label="Mot de passe"
                        variant="outlined"
                        type="password"
                        name="password"
                        inputRef={register}
                    />
                    {errors.password && <p className="fieldError error">{errors.password.message}</p>}
                </div>
                {displayMessage()}
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
