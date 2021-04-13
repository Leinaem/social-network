import thunk from "redux-thunk";
import UserLoginReducer from "../Reducers/user/UserLoginReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";

export default createStore(
  combineReducers({
    userLogin: UserLoginReducer,
  }),
  applyMiddleware(thunk)
);
