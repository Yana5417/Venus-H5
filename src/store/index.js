import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { ENV } from '@/constants';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

let middlewares = [
  thunkMiddleware // 允许我们 dispatch() 函数
];

if (ENV === 'development') {
  middlewares.push(
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  );
}

const createStoreWithMiddleware = applyMiddleware.apply(null, middlewares)(createStore);

const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
