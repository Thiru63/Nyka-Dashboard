import { legacy_createStore, combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from 'redux-thunk'
import { authReducer } from "./AuthReducer/reducer";
import { docterReducer } from './DocterReducer/reducer'


const rootReducer = combineReducers({ authReducer, docterReducer })
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


