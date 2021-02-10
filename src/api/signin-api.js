
import React, { useState } from "react";
import axios from "axios";
import { history, store } from "../store/store";
import { validateEmail } from "../functions";
import { loginSaveStore } from "../actions/actions";


export let signInApi = (setReqMessage, email, password) => {
    //const email = document.getElementById('email').value;
    //const password = document.getElementById('password').value;
    if (email, password){
      const validEmail = validateEmail(email);
      if (validEmail===true){
      // const loginData = {
      //   email: email,
      //   password: password
      // }  
      // console.log(loginData);
        const url = "http://localhost:3000/login";
        //const url = "/login";
        axios
          .post(url, {
            // loginData,
            //user:"test@test"
            username: email, password: password
          })
          .then((response) => {
            let bd;
            if (response.statusText === "OK") {
              console.log(response);
              const jwt = response.data;
              console.log(jwt);
              const loginData = {
                currentUser: email,
                jwtToken: jwt.jwtToken
              } 
              store.dispatch(loginSaveStore(loginData));
              //props.loginSaveStore(loginData);

              //localStorage.setItem("jwt", JSON.stringify(jwt));
              localStorage.setItem("loginData", JSON.stringify(loginData));
              console.log("Аутентификация прошла успешно, loginData записан в LocalStorage")
              bd = true;
            }else{
              const mes = "Ошибка сервера";
              setReqMessage(mes);
              bd = false;
            }
            return bd;
          })
          .then((db) => {
            if (db) {
              console.log("Переход на главную страницу после аутентификации");
              history.push({
                pathname: '/home',
                state: { needLoadData: true }
              })
            }
          })
          .catch((error) => {
            if (error.response){
              if (error.response.status === 401){
                  setReqMessage("Не верный логин или пароль!");
              }else{
                console.log(`Ошибка соединения:${error}`);
                setReqMessage("Ошибка сервера");
              }
            }else{
              console.log(`Ошибка сервера:${error}`);
              setReqMessage("Ошибка сервера");
            }
          });
        }else{
          const mes = "Email имеет не верный формат!";
          setReqMessage(mes);
        }
      }else{
        const mes = "Заполните обязательные поля!";
        setReqMessage(mes);
      } 
};




// export let signInApi = async () => {
//   let mes = "";
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   if ((email, password)) {
//     const validEmail = validateEmail(email);
//     if (validEmail === true) {
//       // const loginData = {
//       //   email: email,
//       //   password: password
//       // }
//       // console.log(loginData);
//       const url = "http://localhost:3000/login";
//       //const url = "/login";
//       axios
//         .post(url, {
//           // loginData,
//           //user:"test@test"
//           username: email,
//           password: password,
//         })
//         .then((response) => {
//           let bd;
//           if (response.statusText === "OK") {
//             console.log(response);
//             const jwt = response.data;
//             console.log(jwt);
//             const loginData = {
//               currentUser: email,
//               jwtToken: jwt.jwtToken,
//             };
//             //props.loginSaveStore(loginData);
//             store.dispatch(loginSaveStore(loginData));


//             //localStorage.setItem("jwt", JSON.stringify(jwt));
//             localStorage.setItem("loginData", JSON.stringify(loginData));
//             console.log(
//               "Аутентификация прошла успешно, loginData записан в LocalStorage"
//             );
//             bd = true;
//           } else {
//             //const mes = "Ошибка сервера";
//             mes = "Ошибка сервера";
//             //setReqMessage(mes);
//             bd = false;
//           }
//           return bd;
//         })
//         .then((db) => {
//           if (db) {
//             console.log("Переход на главную страницу после аутентификации");
//             mes = "Переход на главную страницу после аутентификации"  ///!!! убрать
//             history.push({
//               pathname: "/home",
//               state: { needLoadData: true },
//             });
//           }
//         })
//         .catch((error) => {
//           if (error.response) {
//             if (error.response.status === 401) {
//               //setReqMessage("Не верный логин или пароль!");
//               mes = "Не верный логин или пароль!"
//               console.log(mes)
//               return mes;
//             } else {
//               console.log(`Ошибка соединения:${error}`);
//               //setReqMessage("Ошибка сервера");
//               mes = "Ошибка сервера"
//               //return mes;
//             }
//           } else {
//             console.log(`Ошибка сервера:${error}`);
//             //setReqMessage("Ошибка сервера");
//             mes = "Ошибка сервера"
//           }
//         });
//         return mes;
//     } else {
//       mes = "Email имеет не верный формат!";
//      // const mes = "Email имеет не верный формат!";
//      // setReqMessage(mes); 
//     }
//   } else {
//     mes = "Заполните обязательные поля!";
//     //const mes = "Заполните обязательные поля!";
//     //setReqMessage(mes);
//   }
//   //console.log(mes)
//  // return mes
// };
