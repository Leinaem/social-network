import UserLoginReducer from "../reduxOld/Reducers/user/UserLoginReducer";
import { configureStore } from '@reduxjs/toolkit';
import Colors from "./colorsSlice";
import Socket from "./socketSlice";

export const store = configureStore({
  reducer: {
    userLogin: UserLoginReducer,
    socketStore: Socket,
    colorsStore: Colors,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
