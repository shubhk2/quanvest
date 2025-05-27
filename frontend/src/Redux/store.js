import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { reducer as authReducer } from './AuthReducer/reducer.js';
import { reducer as globalReducer } from './GlobalReducer/reducer.js';
import { reducer as mainReducer } from './MainReducer/reducer.js';
import { thunk } from 'redux-thunk';

const reducers = combineReducers({
    authReducer,
    globalReducer,
    mainReducer
})

export const store = legacy_createStore(reducers, applyMiddleware(thunk));