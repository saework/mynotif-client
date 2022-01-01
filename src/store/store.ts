import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createRootReducer, initialState } from '../reducers/reducers';

/** Объективно, использование redux на проекте не нужно.
 * Я предполагаю, что тебе скорее всего просто хотелось его пощупать.
 * Но поверь, на таком проекте всю прелесть и все проблемы не понять.
 * Если не рассматривать проект как учебный, то я бы удивилась наличию redux
 * и поставила бы это в минус.
 * Я бы предложила переписать на Context, а для redux попробовать что-то другое,
 * желательно с использование middleware (saga, thank)
 */

export const history = createBrowserHistory();

const logger = createLogger({
  predicate: () => process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
});

/** Так же в названии переменной есть ошибки.
 * Первое, я подозреваю что она должна была называться composedEnh.
 * Если ты не заметил опечатки, значит в твоем редакторе не стоит никакого плагина на проверку правописания.
 * Советую поставить, очень полезно. Причем ставь проверку и для русского и для английского языка.
 * Второе, сокращения вроде Enh это фу, за очень редким исключением (я такое сходу помню только одно - init от initialization)
 */
const conmposedEnh = compose(applyMiddleware(logger, routerMiddleware(history)));

export const store = createStore(createRootReducer(history), initialState as any, conmposedEnh);
