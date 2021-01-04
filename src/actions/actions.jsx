export function drawRows(bdRows) {
  return {
    type: 'DRAW_ROWS',
    payload: bdRows,
  };
}
export function checkIdBdRow(checkedId) {
  return {
    type: 'CHECK_ID_ROW',
    payload: checkedId,
  };
}
export function addBdRow(bdRow) {
  return {
    type: 'ADD_BD_ROW',
    payload: bdRow,
  };
}
export function delBdRow(bdRow) {
  return {
    type: 'DEL_BD_ROW',
    payload: bdRow,
  };
}
export function editBdRow(bdRow) {
  // console.log("ADD_NEW_BD_ROW");
  return {
    type: 'EDIT_BD_ROW',
    payload: bdRow,
  };
}
export function loadFromCookies(bd) {
  // console.log("ADD_NEW_BD_ROW");
  return {
    type: 'LOAD_FROM_COOKIES',
    payload: bd,
  };
}
