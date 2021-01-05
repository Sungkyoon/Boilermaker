import { createStore, applyMiddleware } from 'redux';
import mockReducer from './reducer.js';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  mockReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
