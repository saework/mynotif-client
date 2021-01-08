export interface IBdRow {
  id: number,
  persName: string,
  bdDate: string,
  bdComm: string
  }
export interface IBdRows {
  bdRows: IBdRow[]
}
export interface IRootReducer {
  currentUser: string,
  currentId: number,
  checkedId: number,
  bdRows: IBdRow[]
}
export interface IRouter {
  location: any,
  action: string
}
export interface IStore {
  router: IRouter,
  rootReducer: IRootReducer
}
export type TActionPayload = number | IBdRow | IBdRows;
export interface IAction {
  type: string,
  payload: TActionPayload 
}
export interface ItmzObj {
  timeZoneValue: string,
  timeZoneText: string
}

