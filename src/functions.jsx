import _ from "lodash";
import { store } from "./store/store";

export function getCurrentId() {
  const { currentId } = store.getState().rootReducer;
  return currentId;
}
export function getRowById(bdRowId) {
  const { bdRows } = store.getState().rootReducer;
  const bdRow = _.find(bdRows, { id: bdRowId }); // через lodash
  return bdRow;
}
