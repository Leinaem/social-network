import thunk from "redux-thunk";
import UserLoginReducer from "../Reducers/user/UserLoginReducer";
import SocketReducer from "../Reducers/SocketReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import UserProfileReducer from "../Reducers/user/UserProfileReducer";

export default createStore(
  combineReducers({
    userProfile: UserProfileReducer,
    userLogin: UserLoginReducer,
    socket: SocketReducer,
  }),
  applyMiddleware(thunk)
);
