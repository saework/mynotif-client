import React, { useState } from "react";
import axios from "axios";
import { history, store } from "../store/store";
import { validateEmail } from "../functions";
import { loginSaveStore } from "../actions/actions";


export let signUpApi = (setReqMessage) => {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordRpt = document.getElementById('passwordRpt').value;

  //console.log(validateEmail(email))

  if (email && password && passwordRpt){
    if (password===passwordRpt){
      const validEmail = validateEmail(email);
      if (validEmail===true){
    // const loginData = {
    //   email: email,
    //   password: password
    // }  
    // console.log(loginData);
      const url = "http://localhost:3000/signup";
    //const url = "/signup";
      axios
        .post(url, {
          // loginData,
          //user:"test@test"
          username: email, password: password
        })
        .then((response) => {
          let bd;
          if (response.statusText === "OK") {
            //console.log(response);
            //console.log(response.data);
            const respRes = response.data.result;
            if (respRes==="jwt"){
              const jwt = response.data.jwt;
              if (jwt){
                const jwt = response.data;
                console.log(jwt);
              // props.loginSaveStore(jwtData);
                const loginData = {
                  currentUser: email,
                  jwtToken: jwt.jwtToken
                } 
                store.dispatch(loginSaveStore(loginData));
                //props.loginSaveStore(loginData);
                
                //localStorage.setItem("jwt", JSON.stringify(jwt));
                localStorage.setItem("loginData", JSON.stringify(loginData));
                console.log("Регистрация прошла успешно, loginData записан в LocalStorage");
                bd = true;
              }else{
                bd = null;
                const mes = "Ошибка аутентификации";
                //console.log(mes);
                setReqMessage(mes);
              }
            }else{
              setReqMessage(respRes);
              bd = null;
            }
          }else{
            const mes = "Ошибка сервера";
            setReqMessage(mes);
          }
          return bd;
        })
        .then((db) => {
          if (db) {
            console.log("Переход на главную страницу после регистрации");
            history.push({
              pathname: '/home',
              state: { needLoadData: false }
            })
          }
        })
        .catch((error) => {
          console.log(`Ошибка соединения:${error}`);
          setReqMessage("Ошибка соединения");
        });
      }else{
        const mes = "Email имеет не верный формат!";
        setReqMessage(mes);
      }
    }else{
      const mes = "Пароли не совпадают!";
      setReqMessage(mes);
    }
  }else{
    const mes = "Заполните обязательные поля!";
    setReqMessage(mes);
  } 
};