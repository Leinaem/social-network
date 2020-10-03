import {
    SET_LOGIN,
    SET_ACTION
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


