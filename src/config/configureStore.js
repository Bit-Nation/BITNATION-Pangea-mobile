import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import rootSaga from '../sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(logger),
    applyMiddleware(sagaMiddleware),
  );

  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(rootSaga);

  // TO DO : combineReducers was replaced with persistCombineReducers.
  // persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
