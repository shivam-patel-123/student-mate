import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const saga = createSagaMiddleware();

const middlewares = [];

if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

middlewares.push(saga);

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

saga.run(rootSaga);

export const persistor = persistStore(store);
