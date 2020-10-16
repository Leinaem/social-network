const initialState = {
    isLogged: false,
    loggedUserName: '',
    openForm: 'login',
    serverError : ''
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
        case 'SET_ACTION': {
            return {
                ...state,
                openForm: payload
            }
        }
        case 'SET_ERROR_SERVER': {
            return {
                ...state,
                serverError: payload
            }
        }
        default: {
            return state;
        }
    }
}

export default LoginReducer;
