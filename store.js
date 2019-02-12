import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { initialSheetState } from './reducers/sheets';
import rootSaga from './sagas/root';

const { composeWithDevTools } = require('redux-devtools-extension');

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = initialSheetState) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();
  return store;
}

export default configureStore;