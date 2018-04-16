// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

/**
 * @desc Configures a Redux store.
 * @return {Store} Created store object.
 */
export default function configureStore() {
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(logger),
  );

  const store = createStore(reducers, enhancer);
  return store;
}
