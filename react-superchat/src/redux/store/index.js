import { createStore, combineReducers, applyMiddleware } from "redux";
import LoginReducer from "../Reducers/LoginReducer";
import thunk from "redux-thunk";

export default createStore(
  combineReducers({
    login: LoginReducer,
  }),
  applyMiddleware(thunk)
);
