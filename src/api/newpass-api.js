import React, { useState } from "react";
import axios from "axios";
import { history, store } from "../store/store";
import { validateEmail } from "../functions";
import { loginSaveStore } from "../actions/actions";


export let newPassApi = (setReqMessage) => {
// const currUserEmail = store.getState().rootReducer.currentUser;
    // console.log(currUserEmail);
    // this.loadBDfromServer(currUserEmail);

    const email = document.getElementById('email').value;
    if (email){
      const validEmail = validateEmail(email);
      if (validEmail===true){
          const url = "http://localhost:3000/newpassword";
          const data = {currUserEmail: email};
          // const url = "/newpassword";
          axios
            .post(url, {
              data,
            })
            .then((response) => {
              if (response.statusText === "OK") {
                const res = response.data.result; 
                console.log(res);
                if (res==="ok"){
                  setReqMessage(response.data.mes);
                }else{
                  setReqMessage("Ошибка сервера");
                }
              }
            })
            .catch((error) => {
              console.log(`Ошибка соединения:${error}`);
            });
      }else{
        const mes = "Email имеет не верный формат!";
        setReqMessage(mes);
      }
    }else{
      const mes = "Заполните поле Email!";
      setReqMessage(mes);
    } 


};