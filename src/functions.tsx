import _ from "lodash";
import { store } from "./store/store";
import { IBdRow } from "./interfaces";

export function getCurrentId(): number {
  const { currentId } = store.getState().rootReducer;
  return currentId;
}
export function getRowById(bdRowId: number): IBdRow {
  const { bdRows } = store.getState().rootReducer;
  const bdRow = _.find(bdRows, { id: bdRowId }); // через lodash
  return bdRow;
}
