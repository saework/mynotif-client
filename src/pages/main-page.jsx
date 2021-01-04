// import { array } from "prop-types";
// import React, {useState, useEffect} from "react";
import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  push, go, goBack, goForward,
} from 'connected-react-router';
import axios from 'axios';
import MainInfo from '../components/main-info';
import MainForm from '../components/main-form';
import '../style.scss';
import { store } from '../store/store';
import { loadFromCookies } from '../actions/actions';
// import Cookies from "js-cookie";

// import * as Rx from 'rxjs';
// import { map, filter, debounceTime, mergeMap, concatAll, observeOn} from 'rxjs/operators';
// import { result } from "lodash";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = { loading: false };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    // this.setState({loading:false});

    //! !справочник по свойствам: класс Element, HTMLElement !!
    // console.log(this.myRef.current.className)
    // this.myRef.current.addEventListener('click',()=>{
    //      console.log('!');
    // })

    //! !RxJS!!
    // const input = document.getElementById('input');
    // const keyUp = Rx.fromEvent(input, 'keyup').pipe(
    //   debounceTime(700),
    //   map(event=>event.target.value),
    //   filter(val=>val.length > 2),
    //   mergeMap(()=> Rx.from(this.loadBDfromServer(store.getState().currentUser))),
    // )
    // keyUp.subscribe({
    //   next:res=>console.log(res),
    //   error:console.log
    // });
    // console.log(this.props)
  }

  // useEffect(()=>{
  // console.log("component did update");
  // });

  handlerLoading=() => (this.state.loading === true ? 'Загрузка данных..' : '');

  handlerSaveInCookies=(e) => {
    // Cookies.set('bdcook', store.getState().rootReducer,{expires:7});  //на 7 дней (иначе будут удалены после закрытия браузера)
    // this.setState({loading:true});
  };

  handlerLoadFromCookies=(e) => {
    // const bd = Cookies.getJSON('bdcook');
    // store.dispatch(loadFromCookies(bd));
    // his.setState({loading:false});
  };

  // localStorage
  handlerSaveInLocalSt=(e) => {
    const bd = JSON.stringify(store.getState().rootReducer);
    localStorage.setItem('bdls', bd);
  };

  handlerLoadFromLocalSt=(e) => {
    const bdls = localStorage.getItem('bdls');
    console.log(bdls);
    // console.log(JSON.stringify(bdls));
    const bd = JSON.parse(bdls);
    // console.log(bd.bdRows);
    store.dispatch(loadFromCookies(bd));
  };

  // взаимодействие с сервером
  handlerSaveToServer=(e) => {
    const bdRows = store.getState().rootReducer;
    const currUserEmail = store.getState().rootReducer.currentUser;
    // console.log(store.getState().rootReducer)
    const data = {
      bdRows,
      currUserEmail,
    };
    console.log(data);
    this.sendBDtoServer(data);
  };

  handlerLoadFromServer=(e) => {
    const currUserEmail = store.getState().rootReducer.currentUser;
    this.loadBDfromServer(currUserEmail);
  };

  // отправить данные в БД POST-запрос
  sendBDtoServer(data) {
    const url = 'http://localhost:3000';
    // const url = "/";
    axios.post(url, {
      data,
    })
      .then((response) => {
        if (response.statusText === 'OK') {
          const res = response.data;
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(`Ошибка соединения:${error}`);
      });
  }

  // получить данные из БД через GET-запрос
  loadBDfromServer(currUserEmail) {
    this.setState({ loading: true });
    const url = 'http://localhost:3000/load';
    // const url = "/load?currUserEmail=" + currUserEmail;
    axios.get(url, {
      params: {
        currUserEmail,
      },
    })
      .then((response) => {
        // console.log(response)
        let bd;
        if (response.statusText === 'OK') {
          const { data } = response;
          // console.log(data);
          const json = data[0].bdData;
          bd = JSON.parse(json);
        }
        return bd;
      })
      .then((bd) => {
        setTimeout(() => {
          console.log('ожидание..');
          store.dispatch(loadFromCookies(bd));
          this.setState({ loading: false });
        }, 3000);
      })
      .catch((error) => {
        console.log(`Ошибка соединения:${error}`);
        this.setState({ loading: false });
      });
  }

  handlerLoginPage=() => {
    this.props.goTo({ path: '/login' });
  };

  handlerNextPage=() => {
    // this.props.goOne({ num:1});
    this.props.forw();
  };

  handlerPrevPage=() => {
    // this.props.goOne({ num:-1});
    this.props.back();
  };

  render() {
    return (

      <div>
        <Container>
          <MainInfo bdRows={this.props.bdRows} />
          <MainForm bdRows={this.props.bdRows} />
          <div>
            <Link to="/login"><button>Войти</button></Link>
            <Link to="/signup"><button>Регистрация</button></Link>
          </div>
          <Alert className="message__alert_center" variant="light" id="mainLabel">{this.handlerLoading()}</Alert>
          <button onClick={this.handlerSaveInCookies}>saveInCookies</button>
          <button onClick={this.handlerLoadFromCookies}>loadFromCookies</button>
          <button onClick={this.handlerSaveToServer}>SaveToServer</button>
          <button onClick={this.handlerLoadFromServer}>LoadFromServer</button>
          <button onClick={this.handlerLoginPage}>LoginPage</button>
          <button onClick={this.handlerNextPage}>NextPage</button>
          <button onClick={this.handlerPrevPage}>PrevPage</button>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  store,
  bdRows: store.rootReducer.bdRows,
});
const mapDispatchToProps = (dispatch) => ({
  goTo: (payload) => { dispatch(push(payload.path)); },
  goOne: (payload) => { dispatch(go(payload.num)); },
  back: () => { dispatch(goBack()); },
  forw: () => { dispatch(goForward()); },
  // delBdRow: newbdRow=>dispatch(delBdRow(newbdRow)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
