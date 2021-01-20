import { IAction, IRootReducer, IBdRows, IBdRow } from "../interfaces";
export function drawRows(bdRows: IBdRows): IAction {
  return {
    type: "DRAW_ROWS",
    payload: bdRows,
  };
}
export function checkIdBdRow(checkedId: number): IAction {
  return {
    type: "CHECK_ID_ROW",
    payload: checkedId,
  };
}
export function addBdRow(bdRow: IBdRow): IAction {
  return {
    type: "ADD_BD_ROW",
    payload: bdRow,
  };
}
export function delBdRow(bdRow: IBdRow): IAction {
  return {
    type: "DEL_BD_ROW",
    payload: bdRow,
  };
}
export function editBdRow(bdRow: IBdRow): IAction {
  return {
    type: "EDIT_BD_ROW",
    payload: bdRow,
  };
}
export function loadBD(bd:IRootReducer): IAction {
  return {
    type: "LOAD_BD",
    payload: bd,
  };
}
export function loginSaveStore(loginData:IRootReducer): IAction {
  return {
    type: "LOGIN_SAVE_STORE",
    payload: loginData,
  };
}
