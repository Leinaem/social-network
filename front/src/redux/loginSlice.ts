import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userData {
  id: string;
  userName?: string;
  admin?: number;
  createdAt?: string;
  photo: {
    type: string;
    src: string;
  };
}

interface tmpMessage {
  type: string;
  message: string;
}

export interface LoginState {
  isLogged: Boolean;
  openForm: string;
  tmpMessage: null | tmpMessage;
  userData: userData;
  isLoading: Boolean;
}

const initialState: LoginState = {
  isLogged: false,
  openForm: "login",
  tmpMessage: null,
  userData: {
    id: "",
    photo: {
      type: "",
      src: ""
    }
  },
  isLoading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginAction(state, action: PayloadAction<Boolean>) {
      state.isLogged = action.payload;
    },
    setOpenFormAction(state, action: PayloadAction<string>) {
      state.openForm = action.payload;
    },
    addTmpMessageAction(state, action: PayloadAction<tmpMessage>) {
      state.tmpMessage = action.payload;
    },
    setUserData(state, action: PayloadAction<userData>) {
      state.userData = action.payload;
    },
    isLoading(state, action: PayloadAction<Boolean>) {
      state.isLoading = action.payload;
    },
    setLogOut(state) {
      state.isLogged = false;
      state.userData = {id: "",
      photo: {
        type: "",
        src: ""
      }};
      state.isLoading = false;
    },
  },
});

export const {
  setLoginAction,
  setOpenFormAction,
  addTmpMessageAction,
  setUserData,
  isLoading,
  setLogOut,
} = loginSlice.actions;
export const loginSelector = (state: { login: LoginState }) => state.login;
export default loginSlice.reducer;
