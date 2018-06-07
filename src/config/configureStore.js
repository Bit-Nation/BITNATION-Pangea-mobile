// @flow

import { createStore, applyMiddleware, compose, type Store } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createSagaMonitor from 'saga-monitor';
import reducers from '../reducers';
import rootSaga from '../sagas';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/**
 * @desc Configures a Redux store.
 * @return {Store} Created store object.
 */
export default function configureStore(): Store {
  const sagaMonitor = createSagaMonitor({
    level: 'log',
    actionDispatch: true,
  });
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(logger),
  );

  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
