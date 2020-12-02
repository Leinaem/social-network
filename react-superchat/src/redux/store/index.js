import thunk from "redux-thunk";
import LoginReducer from "../Reducers/LoginReducer";
import SocketReducer from "../Reducers/SocketReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";

export default createStore(
  combineReducers({
    login: LoginReducer,
    socket: SocketReducer,
  }),
  applyMiddleware(thunk)
);
