import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import RootSagas from './sagas';

/**
 * Create saga middleware to redux
 */
const sagaMiddleWare = createSagaMiddleware();

/**
 * Create store of redux
 */
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

/**
 * Run root of sagas
 */
sagaMiddleWare.run(RootSagas);
export default store;
