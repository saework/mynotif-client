import { IAction, IRootReducer, IBdRows, IBdRow, ILoginData } from '../interfaces';

/** Аналогично как и с reducers. Лучше чтобы всё, что относится к store лежало в одной папке
 * store/actions/index.ts
 */

export function drawRows(bdRows: IBdRows): IAction {
  return {
    type: 'DRAW_ROWS',
    payload: bdRows,
  };
}
export function checkIdBdRow(bdRowId: number): IAction {
  return {
    type: 'CHECK_ID_ROW',
    payload: bdRowId,
  };
}
export function addBdRow(bdRow: IBdRow): IAction {
  return {
    type: 'ADD_BD_ROW',
    payload: bdRow,
  };
}
export function delBdRow(bdRowId: number): IAction {
  return {
    type: 'DEL_BD_ROW',
    payload: bdRowId,
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
export function loginSaveStore(loginData: ILoginData): IAction {
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
