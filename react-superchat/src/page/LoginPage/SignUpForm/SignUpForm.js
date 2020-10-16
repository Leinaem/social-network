import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';

const SignUpForm = (props) => {
    const {
        signUp,
        showForm,
        register,
        handleSubmit,
        setError,
    } = props;
    const { serverError } = useSelector((state) => state.login);


    let { errors } = props

    const addStyle = () => {
        if (showForm) {
            return "showForm"
        }

        errors = {};
        return "hideForm";
    }


    return (
        <form onSubmit={handleSubmit((data) => signUp(data, setError))}>
                <Fragment>
                    <div className={addStyle()}>
                    <TextField
                        className="text-field"
                        label="Pseudo"
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
                    <TextField
                        className="text-field"
                        label="Confirmation mot de passe"
                        variant="outlined"
                        type="password"
                        name="passwordConfirm"
                        inputRef={register}
                    />
                    {errors.passwordConfirm && <p className="error">{errors.passwordConfirm.message}</p>}
                    </div>
                    {showForm && Boolean(serverError.length) &&
                        <div className="errorServerContainer">
                            <p className="errorServer">{serverError}</p>
                        </div>
                    }
                </Fragment>
            <Button
                type="submit"
                className="sign-in-btn"
                variant="contained"
                disabled={Boolean(Object.keys(errors).length)}
            >
                Inscription
            </Button>
        </form>
    )
}

export default SignUpForm;
