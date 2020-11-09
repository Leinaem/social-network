import {
    SET_LOGIN,
    SET_USER_NAME,
    ADD_TMP_MESSAGE,
    SET_OPEN_FORM_ACTION
} from '../Constants/LoginConstants'

export const setLoginAction = (login) => {
    return {
        type: SET_LOGIN,
        payload: login
    };
};

export const setOpenFormAction = (openForm) => {
    return {
        type: SET_OPEN_FORM_ACTION,
        payload: openForm
    };
};

export const setUserNameAction = (userName) => {
    return {
        type: SET_USER_NAME,
        payload: userName
    }
}

export const addTmpMessageAction = (message) => {
    return {
        type: ADD_TMP_MESSAGE,
        payload: message
    };
};


