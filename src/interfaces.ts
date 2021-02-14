export interface IBdRow {
  id: number;
  persName: string;
  bdDate: string;
  bdComm: string;
  bdTmz: string;
  bdPeriod: string;
}
export interface IBdRows {
  bdRows: IBdRow[];
}
export interface IRootReducer {
  currentUser: string;
  currentId: number;
  checkedId: number;
  jwtToken: {};
  bdRows: IBdRow[];
}
export interface IRouter {
  location: any;
  action: string;
}
export interface IStore {
  router: IRouter;
  rootReducer: IRootReducer;
}
export interface ILoginData {
  currentUser: string;
  jwtToken: string;
}
export type TActionPayload = number | IBdRow | IBdRows | ILoginData;
export interface IAction {
  type: string;
  payload: TActionPayload;
  // payload?: any
}
export interface ItmzObj {
  timeZoneValue: string;
  timeZoneText: string;
}
export interface ISendData {
  bdRows: IBdRow[];
  currentUser: string;
  jwtToken: {};
}
