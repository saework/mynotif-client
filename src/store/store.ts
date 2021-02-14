import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createRootReducer, initialState } from '../reducers/reducers';

export const history = createBrowserHistory();

const logger = createLogger({});
const conmposedEnh = compose(
  applyMiddleware(logger, routerMiddleware(history))
);

export const store = createStore(
  createRootReducer(history),
  initialState as any,
  conmposedEnh
);
