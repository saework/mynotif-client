import { isEmpty } from 'lodash';
import React from 'react';
import axios from 'axios';
import { history, store } from '../store/store';
import { getLoginData } from '../functions';
import { loadBD } from '../actions/actions';
import { ISendData } from '../interfaces';

/** В имени файлов не нужно окончание "-api". Не очень чисто получается.
 * Мы и так находимся в папке api.
 */

/** Не хватает корня для папки api, который бы собирал все модули api в одну кучу
 * Тогда по всему проекту будет так:
 * import {api} from 'src/api';
 * api.sendBDtoServer()
 * Сразу понятно, что метод вызывает api. Считай это стандарт.
 */

// Отправить список задач пользователя на сервер
export const sendBDtoServer = (data: ISendData, setLoading: React.Dispatch<React.SetStateAction<string>>) => {
  /** Если у нас ts, то плохо когда у нас можно внутрь функции передавать любую строку,
   * если это не какой-нибудь title или text. Нужно ограничить через enum
   */
  setLoading('save');
  // const url = 'http://localhost:3000/home';

  /** Все существующие url(path) нужно собрать в enum и каждый раз использовать её */
  const url = '/home';
  const jwtAuthHeader = getLoginData('jwtAuthHeader');
  if (!isEmpty(jwtAuthHeader)) {
    /** В продакшене конечно никаких console.log не должно быть
     * Редко можно использовать console.error. Иначе либо глотать ошибку,
     * либо показывать пользователю, либо мутить систему логирования через бек
     * Последний вариант редко используется и вообще нужен.
     */
    console.log(`sendBDtoServer - jwtAuthHeader - ${JSON.stringify(jwtAuthHeader)}`);
    const config = {
      headers: jwtAuthHeader,
    };

    /** Почему post, если у тебя по смыслу получение данных, т.к. get?
     * Это нормально когда у тебя какое-то левое api,
     * но когда оно твоё и маленькое, то всегда можно поправить.
     * Почитай про REST и RESTFul (глубоко не нужно), в частности про именование endpoints
     * Если коротко, то у тебя есть сущность. Например user
     * У тебя есть endpoint api/user
     * Для получения списка пользователей используешь get
     * Для добавления нового post
     * Для удаления delete
     * Для обновления update/post
     * Для работы с одним пользователем используешь endpoint с параметром типа api/user?id=123
     * Но там конечно много разных нюансов
     *
     * Так же хорошо бы сделать абстракцию над axios, чтобы сделать код менее связным
     * (вдруг ты решишь отказаться от axios? тогда нужно будет бегать по всему api и менять),
     * но главное - чтобы работать с конфигом в одном месте.
     * Например, делаешь api/requests.ts и внутри делаешь абстракцию над каждым из методов
     * axios.post/get/delete и т.д.
     * Экспортируешь их, а дальше по api уже используешь
     * import {post} from './requests';
     * const result = await post(url, data)
     * Подумай как ещё можно сделать.
     */
    axios
      .post(url, { data }, config)
      /** Лучше использовать async/await конструкцию, это сейчас по-умолчанию стандарт для
       * работы с асинхронным кодом
       */
      .then((response) => {
        if (response.statusText === 'OK') {
          const res = response.data;
          console.log(`sendBDtoServer - response.data - ${res}`);
          /** В идеале в коммитах не должно быть закомментированного кода
           * За очень редким исключением
           */
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
/** Лучше всегда использовать многострочные комментарии как мои.
 * Так и красивше и всегда можно что-то дописать, без лишних хлопот.
 * Единообразие везде.
 * Но это уже прям совсем вкусовщина.
 */
// Получить список задач пользователя с сервера
export const loadBDfromServer = (currentUser: string, setLoading: React.Dispatch<React.SetStateAction<string>>) => {
  setLoading('load');
  // const url = 'http://localhost:3000/load';
  const url = '/load';
  const jwtAuthHeader = getLoginData('jwtAuthHeader');
  if (!isEmpty(jwtAuthHeader)) {
    console.log(`loadBDfromServer - jwtAuthHeader - ${JSON.stringify(jwtAuthHeader)}`);
    const config = {
      headers: jwtAuthHeader,
    };
    const data = { currentUser };
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
        if (bd) {
          store.dispatch(loadBD(bd));
        }
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
