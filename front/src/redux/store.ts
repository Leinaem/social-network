import { configureStore } from '@reduxjs/toolkit';
import userProfile from "./userProfileSlice";
import userLogin from "./loginSlice";
import socket from "./socketSlice";

export const store = configureStore({
  reducer: {
    userLogin: userLogin,
    userProfile: userProfile,
    socket: socket,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
