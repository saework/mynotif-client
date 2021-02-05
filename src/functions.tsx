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
export let validateEmail=(email: string)=>{
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


export let getLoginData=(dataType: string)=>{
    const loginDataJSON = localStorage.getItem('loginData') as any;
    //const loginData = JSON.parse(localStorage.getItem('loginData'));
    const loginData = JSON.parse(loginDataJSON);
    let res = null;
    if (loginData){
      if (dataType==="currenUser"){
        res = loginData.currenUser;
      }
      if (dataType==="jwtToken"){
        res = loginData.jwtToken;
      }
      if (dataType==="jwtAuthHeader"){
        const jwtToken = loginData.jwtToken
        console.log(loginData)
        if (jwtToken){
          res = { Authorization:`bearer ${jwtToken}`};
        }
      }
    }
    console.log("getLoginData res: "+ res);
    return res;
  }