import _ from 'lodash';
import { store } from './store/store';
import { IBdRow } from './interfaces';
// import consoleLog from './configs/console-log';

export const getCurrentId = (): number => {
  const { currentId } = store.getState().rootReducer;
  return currentId;
};
export const getRowById = (bdRowId: number): IBdRow => {
  const { bdRows } = store.getState().rootReducer;
  const bdRow = _.find(bdRows, { id: bdRowId });
  return bdRow;
};
export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const getLoginData = (dataType: string): string | {} => {
  const loginDataJSON = localStorage.getItem('loginData') as string;
  // const loginData = JSON.parse(localStorage.getItem('loginData'));
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
      // console.log(loginData);
      console.log(loginData);
      if (jwtToken) {
        res = { Authorization: `bearer ${jwtToken}` };
      }
    }
  }
  // console.log(`getLoginData res: ${res}`);
  console.log('getLoginData res: ');
  console.log(res);
  return res;
};
