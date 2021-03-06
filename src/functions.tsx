import _ from 'lodash';
import { store } from './store/store';
import { IBdRow } from './interfaces';

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
