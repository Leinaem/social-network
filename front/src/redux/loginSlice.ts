import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface LoginState {
    isLogged: Boolean;
    openForm: string;
    tmpMessage: any; //null|object
    userData: any; // object
    isLoading: Boolean;

    
    serverError: string;
};

const initialState: LoginState = {
    isLogged: false,
    openForm: "login",
    tmpMessage: null,
    userData: {},
    isLoading: false,


    serverError: "",
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginAction(state, action: PayloadAction<Boolean>) {
            state.isLogged = action.payload
        },
        setOpenFormAction(state, action: PayloadAction<string>) {
            state.openForm = action.payload
        },
        addTmpMessageAction(state, action: PayloadAction<any>) {
            state.tmpMessage = action.payload
        },
        setUserData(state, action: PayloadAction<any>) {
            state.userData = action.payload
        },
        isLoading(state, action: PayloadAction<Boolean>) {
            state.isLoading = action.payload
        },
        setLogOut(state) {
            state.isLogged = false
            state.userData = {}
            state.isLoading = false
        },
    }
});


export const { 
    setLoginAction,
    setOpenFormAction,
    addTmpMessageAction,
    setUserData,
    isLoading,
    setLogOut,
} = loginSlice.actions;
export const loginSelector = (state: { login: LoginState }) => 
state.login;
export default loginSlice.reducer;
