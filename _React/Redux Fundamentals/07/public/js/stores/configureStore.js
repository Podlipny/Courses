import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

var logger = createLogger({
    collapsed: true
})

var store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

export default store;
