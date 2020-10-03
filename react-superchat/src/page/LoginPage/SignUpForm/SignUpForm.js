import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const SignUpForm = (props) => {
    const { signUp, showForm, register, handleSubmit } = props
    let { errors } = props

    const addStyle = () => {
        if (showForm) {
            return "showForm"
        }

        errors = {};
        return "hideForm";
    }


    return (
        <form onSubmit={handleSubmit((data) => signUp(data))}>
            {/* {showForm && */}
                <Fragment>
                    <div className={addStyle()}>
                    <TextField
                        className="text-field"
                        label="Pseudo"
                        variant="outlined"
                        defaultValue="test"
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
                        defaultValue="azertyui"
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
                        defaultValue="azertyui"
                    />
                    {errors.passwordConfirm && <p className="error">{errors.passwordConfirm.message}</p>}
                    </div>
                </Fragment>
            {/* } */}
            <Button
                type="submit"
                className="sign-in-btn"
                variant="contained"
            >
                Inscription
            </Button>
        </form>
    )
}

export default SignUpForm;
