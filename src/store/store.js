import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history'; // версия библиотеки должна быть 4.10.1 : npm install history@4.10.1
import { createRootReducer, initialState } from '../reducers/reducers';

export const history = createBrowserHistory();

const logger = createLogger({});
const conmposedEnh = compose(
  applyMiddleware(logger, routerMiddleware(history))
);

export const store = createStore(
  createRootReducer(history),
  initialState,
  conmposedEnh
);
