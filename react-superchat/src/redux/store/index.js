import { createStore, combineReducers, applyMiddleware } from 'redux';
import LoginReducer from '../Reducers/LoginReducer';

export default createStore(
    combineReducers({
        login: LoginReducer
    }),
    applyMiddleware()
);
