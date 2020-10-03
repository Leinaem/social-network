const initialState = {
    isLogged: false,
    loggedUserName: '',
    openForm: 'login'
    // openForm: 'signIn'
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGIN': {
            return {
                ...state,
                isLogged: action.payload
            }
        }
        case 'SET_ACTION': {
            return {
                ...state,
                openForm: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default LoginReducer;
