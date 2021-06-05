import { configureStore, getDefaultMiddleware, compose } from '@reduxjs/toolkit';
import {createStore} from 'redux'
import rootReducer from './rootReducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());


export default store;
