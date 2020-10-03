import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginAction } from '../../redux/Actions/LoginActions';

const TopBar = () => {
    const { isLogged } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const renderBtn = () => {
        if (isLogged) {
            return (
                <Fragment>
                    <p>name ici</p>
                    <button
                    onClick={() => dispatch(setLoginAction(false))}
                    >
                        Déconnection
                    </button>
                </Fragment>               
            )
        }

        return (
            <Fragment>
                <button
                    onClick={() => dispatch(setLoginAction(true))}
                    >Connexion</button>    
                <button>Créer un compte</button>
            </Fragment>
        )
    }

    return (
        renderBtn()
    )
}

export default TopBar;
