import _ from 'lodash';
import { store } from './store/store';
import { IBdRow } from './interfaces';

/**
 * Было бы хорошо разбить этот файл. Руководствуемся буквой S в SOLID
 * или single responsibility.
 * Создай папку utils. Для каждой функции создай отдельную папку в соответствии с её именем.
 * Саму функцию положить в index.ts, а рядом файл с юнит-тестами.
 * Ну и собственно хорошо бы покрыть все или почти все функции юнит-тестами.
 * Сразу плюсик к карме.
 */

/** Так же очень полезно писать комментарии к функциям и компонентам
 * Да, мы стремимся к самодокументированному коду, но фактически в большом проекте
 * лучше кратко описывать что делает функция, компонента или интерфейс.
 * См. пример для функции getLoginData
 * /

/** Функции getCurrentId и getRowById относятся к store и здесь им не место
 * Лучше положить их в папку store/selectors.ts или даже store/selectors/index.ts
 */
export const getCurrentId = (): number => {
  const { currentId } = store.getState().rootReducer;
  return currentId;
};
export const getRowById = (bdRowId: number): IBdRow => {
  const { bdRows } = store.getState().rootReducer;
  const bdRow = _.find(bdRows as IBdRow[], { id: bdRowId }) as IBdRow;
  return bdRow;
};
export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/** Получить из localStorage информацию о текущем пользователе */
export const getLoginData = (dataType: string): string | {} => {
  const loginDataJSON = localStorage.getItem('loginData') as string;
  const loginData = JSON.parse(loginDataJSON);
  let res = null;
  if (loginData) {
    if (dataType === 'currenUser') {
      res = loginData.currenUser;
    }
    if (dataType === 'jwtToken') {
      res = loginData.jwtToken;
    }
    if (dataType === 'jwtAuthHeader') {
      const { jwtToken } = loginData;
      if (jwtToken) {
        res = { Authorization: `bearer ${jwtToken}` };
      }
    }
  }
  return res;
};
