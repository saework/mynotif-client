import _ from 'lodash';
import React from 'react';
import axios from 'axios';
import { history, store } from '../store/store';
import { getLoginData } from '../functions';
import { loadBD } from '../actions/actions';
// import consoleLog from '../configs/console-log';
import { ISendData } from '../interfaces';

// Отправить список задач пользователя на сервер
export const sendBDtoServer = (data: ISendData, setLoading: React.Dispatch<React.SetStateAction<string>>) => {
  setLoading('save');
  const url = 'http://localhost:3000/home'; // !!! убрать!!
  // const url = '/home';
  const jwtAuthHeader = getLoginData('jwtAuthHeader');
  if (!_.isEmpty(jwtAuthHeader)) {
    // console.log(`sendBDtoServer - jwtAuthHeader - ${jwtAuthHeader}`);
    console.log('sendBDtoServer - jwtAuthHeader: ');
    console.log(jwtAuthHeader);
    console.log(data);
    const config = {
      headers: jwtAuthHeader,
    };
    axios
      .post(url, { data }, config)
      .then((response) => {
        if (response.statusText === 'OK') {
          const res = response.data;
          console.log(`sendBDtoServer - response.data - ${res}`);
          // setTimeout(() => {
          //   setLoading('');
          // }, 1000);
          setLoading('');
        }
      })
      .catch((error) => {
        setLoading('');
        console.log(`sendBDtoServer - Ошибка соединения:${error}`);
      });
  } else {
    console.log('sendBDtoServer - Не определен jwtAuthHeader!');
    history.push({
      pathname: '/login',
    });
  }
};

// Получить список задач пользователя с сервера
export const loadBDfromServer = (currUserEmail: string, setLoading: React.Dispatch<React.SetStateAction<string>>) => {
  setLoading('load');
  const url = 'http://localhost:3000/load'; // !!! убрать!!
  // const url = '/load';
  const jwtAuthHeader = getLoginData('jwtAuthHeader');
  if (!_.isEmpty(jwtAuthHeader)) {
    console.log('sendBDtoServer - jwtAuthHeader:');
    console.log(jwtAuthHeader);
    const config = {
      headers: jwtAuthHeader,
    };
    const data = { currUserEmail };
    axios
      .post(url, data, config)
      .then((response) => {
        let bd;
        if (response.statusText === 'OK') {
          console.log('Получены данные с сервера');
          const json = response.data[0].bdData;
          if (json) {
            bd = JSON.parse(json);
            console.log(`sendBDtoServer - data[0].bdData - ${json}`);
          } else {
            console.log('Список заданий пользователя пуст');
            bd = null;
          }
        }
        return bd;
      })
      .then((bd) => {
        // setTimeout(() => {
        //   store.dispatch(loadBD(bd));
        //   setLoading('');
        // }, 1000);
        store.dispatch(loadBD(bd));
        setLoading('');
      })
      .catch((error) => {
        console.log(`sendBDtoServer - Ошибка соединения:${error}`);
        setLoading('');
      });
  } else {
    console.log('sendBDtoServer - Не определен jwtAuthHeader!');
    history.push({
      pathname: '/login',
    });
  }
};