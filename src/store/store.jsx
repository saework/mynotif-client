import { createStore, applyMiddleware, compose } from 'redux';
// import { rootReducer, initialState } from '../reducers/reducers.js';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

//! ! версия библиотеки должна быть 4.10.1 : npm install history@4.10.1 !!
import { createBrowserHistory } from 'history';
import { createRootReducer, initialState } from '../reducers/reducers.jsx';

export const history = createBrowserHistory();

const logger = createLogger({});
const conmposedEnh = compose(
  applyMiddleware(logger, routerMiddleware(history)),
  // applyMiddleware(routerMiddleware(history))
);

// const store = createStore(()=>{})
export const store = createStore(createRootReducer(history), initialState, conmposedEnh);
