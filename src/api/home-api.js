import _ from "lodash";
import React, { useState } from "react";
import axios from "axios";
import { history, store } from "../store/store";
import { validateEmail } from "../functions";
import { getLoginData } from "../functions";
import { loadBD } from "../actions/actions";

// отправить данные на сервер
export let sendBDtoServer = (data, setLoading)  => {
    //this.setState({ loading: "save" });
    setLoading("save");
    const url = "http://localhost:3000/home";
    // const url = "/home";
    axios
      .post(url, {
        data,
      })
      .then((response) => {
        if (response.statusText === "OK") {
          const res = response.data;
          console.log(res);
          setTimeout(() => {   ///!!! убрать !!!
            console.log("ожидание..");
            //this.setState({ loading: "" });
            setLoading("");
          }, 2000);
        }
      })
      .catch((error) => {
        //this.setState({ loading: "" });
        setLoading("");
        console.log(`Ошибка соединения:${error}`);
      });
  }

   // получить данные с сервера
  export let  loadBDfromServer = (currUserEmail, setLoading) => {
    //this.setState({ loading: "load" });
    setLoading("load");
    const url = "http://localhost:3000/load";
    // const url = "/load?currUserEmail=" + currUserEmail;
    //const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdEB0ZXN0IiwiaWF0IjoxNjExMTMxMjYwfQ.i3s6T950gGaERqmvTPFOFPIA5XS3HBdxFJ4mEPt9Ahk"
    //const jwtToken = this.authHeader()
    //const jwtToken= JSON.parse(localStorage.getItem('jwt').token);
    //const jwtToken= JSON.parse(localStorage.getItem('jwt'));
    //const jwtAuthHeader =  this.getLoginData("jwtAuthHeader");
    const jwtAuthHeader = getLoginData("jwtAuthHeader");
    if (!_.isEmpty(jwtAuthHeader)){
    //if (jwtAuthHeader){
      console.log(jwtAuthHeader);
      let config = {
        headers: jwtAuthHeader
        // headers: {
        //   Authorization:`bearer ${jwtAuthHeader}`
        // }
      }
      console.log(config);
      let data = {currUserEmail: currUserEmail};
      axios.post(url,  data, config)    
      .then((response) => {
        // console.log(response)
        let bd;
        if (response.statusText === "OK") {
          const { data } = response;
          console.log("Данные из БД успешно загружены");
           console.log(data);
          const json = data[0].bdData;
          bd = JSON.parse(json);
        }
        return bd;
      })
      .then((bd) => {
        setTimeout(() => {   ///!!! убрать !!!
          console.log("ожидание..");
          store.dispatch(loadBD(bd));
          //this.setState({ loading: "" });
          setLoading("");
        }, 2000);
      })
      .catch((error) => {
        console.log(`Ошибка соединения:${error}`);
        //this.setState({ loading: "" });
        setLoading("");
      });
    }else{
      history.push({
        pathname: '/login',
      })
    }
  } 