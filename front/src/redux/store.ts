import { configureStore } from '@reduxjs/toolkit'
import UserProfileReducer from "../reduxOld/Reducers/user/UserProfileReducer";
import SocketReducer from "../reduxOld/Reducers/SocketReducer";
import UserLoginReducer from "../reduxOld/Reducers/user/UserLoginReducer";
import Colors from "./colorsSlice";

export const store = configureStore({
  reducer: {
    userProfile: UserProfileReducer,
    userLogin: UserLoginReducer,
    socket: SocketReducer,
    colorsStore: Colors
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
