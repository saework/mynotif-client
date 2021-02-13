import { IAction, IRootReducer, IBdRows, IBdRow } from '../interfaces';

export function drawRows(bdRows: IBdRows): IAction {
  return {
    type: 'DRAW_ROWS',
    payload: bdRows,
  };
}
// export function checkIdBdRow(checkedId: number): IAction {
export function checkIdBdRow(bdRowId: number): IAction {
  return {
    type: 'CHECK_ID_ROW',
    payload: bdRowId,
    // payload: checkedId,
  };
}
export function addBdRow(bdRow: IBdRow): IAction {
  return {
    type: 'ADD_BD_ROW',
    payload: bdRow,
  };
}
export function delBdRow(bdRowId: number): IAction {
  // export function delBdRow(bdRow: IBdRow): IAction {
  return {
    type: 'DEL_BD_ROW',
    payload: bdRowId,
    // payload: bdRow,
  };
}
export function editBdRow(bdRow: IBdRow): IAction {
  return {
    type: 'EDIT_BD_ROW',
    payload: bdRow,
  };
}
export function loadBD(bd: IRootReducer): IAction {
  return {
    type: 'LOAD_BD',
    payload: bd,
  };
}
export function loginSaveStore(loginData: IRootReducer): IAction {
  return {
    type: 'LOGIN_SAVE_STORE',
    payload: loginData,
  };
}
export function resetStore(): IAction {
  return {
    type: 'RESET_STORE',
    payload: 0,
  };
}
