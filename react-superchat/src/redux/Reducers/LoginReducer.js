const initialState = {
    isLogged: false, // boolean
    userName: '', // string
    openForm: 'login', // string
    serverError : '', // string
    tmpMessage : null // null || object
}

const LoginReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_LOGIN': {
            return {
                ...state,
                isLogged: payload
            }
        }
        case 'SET_USER_NAME': {
            return {
                ...state,
                userName: payload
            }
        }
        case 'SET_OPEN_FORM_ACTION': {
            return {
                ...state,
                openForm: payload
            }
        }
        case 'ADD_TMP_MESSAGE': {
            return {
                ...state,
                tmpMessage: payload
            }
        }
        default: {
            return state;
        }
    }
}

export default LoginReducer;
