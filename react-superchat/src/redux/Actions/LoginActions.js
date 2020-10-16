import {
    SET_LOGIN,
    SET_ACTION,
    SET_ERROR_SERVER
} from '../Constants/LoginConstants'

export const setLoginAction = (login) => {
    return {
        type: SET_LOGIN,
        payload: login
    };
};

export const setOpenFormAction = (openForm) => {
    return {
        type: SET_ACTION,
        payload: openForm
    };
};


export const setServerError = (errorMessage) => {
    return {
        type: SET_ERROR_SERVER,
        payload: errorMessage
    };
};


