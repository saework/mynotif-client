import React from "react";
import { Container, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  push, go, goBack, goForward
} from "connected-react-router";
import axios from "axios";
import MainInfo from "../components/main-info";
import MainForm from "../components/main-form";
import "../style.scss";
import { store, history } from "../store/store";
import { loadBD } from "../actions/actions";

import moment from "moment";

  ///!!!
  // const repeatMap = {
  //   "norep" : "Без повторов",
  //   "evday" : "Ежедневно",
  //   "evweek" : "Еженедельно",
  //   "evwkweek" : "ПН-ПТ",
  //   "evmonth" : "Ежемесячно",
  //   "evyear" : "Ежегодно"
  //  }
  ///!!!

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = { loading: false };
    this.myRef = React.createRef();
  }

  componentDidMount(){
    const historyState = history.location.state;
    if (historyState){
      const needLoadData = historyState.needLoadData;
      if (needLoadData){
        //const currUserEmail = store.getState().rootReducer.currentUser;
        this.handlerLoadFromServer();
      }
    }
  }

  authHeader = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
  
    // if (jwt && jwt.accessToken) {
    //   return { Authorization: 'Bearer ' + jwt.accessToken };
    // } else {
    //   return {};
    // }

    if (jwt) {
      return { Authorization: 'Bearer ' + jwt };
    } else {
      return {};
    }
  }

  logOut = () => {
    localStorage.removeItem("user");
  }

  handlerLoading = () =>
    // eslint-disable-next-line react/destructuring-assignment
    (this.state.loading === true ? "Загрузка данных.." : "");

  // взаимодействие с сервером
  handlerSaveToServer = () => {
    const bdRows = store.getState().rootReducer;
    const currUserEmail = store.getState().rootReducer.currentUser;
    const jwtToken = store.getState().rootReducer.jwtToken;
    // console.log(store.getState().rootReducer)
    const data = {
      bdRows,
      currUserEmail,
      jwtToken
    };
    // console.log(data);
    this.sendBDtoServer(data);
  };



  // запустить задачи
  handlerStartCronTasksOnServer = () => {
    const data = "startCronTasks";
    this.sendBDtoServer(data);
    // console.log(data);
    //console.log(repeatMap.norep);
    

    // const currDate = new Date();
    // const currMonth = Number(currDate.getMonth());
    // console.log(currDate);
    // console.log(currDate.getMonth());
    // console.log(currMonth);
    //const currDate = new Date();
    // const currDate = "11.01.2021";
    //  console.log(new Date().getDay());
    //  console.log(Number("1"));
    // console.log(moment(currDate, "DD.MM.YYYY").day());
   // console.log(moment(currDate, "DD.MM.YYYY").date());

  };
  // остановить задачи
  handlerStopCronTasksOnServer = () => {
    const data = "stopCronTasks";
    // console.log(data);
    this.sendBDtoServer(data);
  };

  handlerLoadFromServer = () => {
    const currUserEmail = store.getState().rootReducer.currentUser;
    console.log(currUserEmail);
    this.loadBDfromServer(currUserEmail);
  };

  // отправить данные в БД POST-запрос
  sendBDtoServer(data) {
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
        }
      })
      .catch((error) => {
        console.log(`Ошибка соединения:${error}`);
      });
  }

  // получить данные из БД через GET-запрос
  loadBDfromServer(currUserEmail) {
    this.setState({ loading: true });
    const url = "http://localhost:3000/load";
    // const url = "/load?currUserEmail=" + currUserEmail;
    //const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdEB0ZXN0IiwiaWF0IjoxNjExMTMxMjYwfQ.i3s6T950gGaERqmvTPFOFPIA5XS3HBdxFJ4mEPt9Ahk"
    //const jwtToken = this.authHeader()
    //const jwtToken= JSON.parse(localStorage.getItem('jwt').token);
    const jwtToken= JSON.parse(localStorage.getItem('jwt'));
    console.log(jwtToken);
    let config = {
      headers: {
        Authorization:`bearer ${jwtToken.token}`
        // accept: '*/*',
        // host: 'localhost:3000',
      }
    }
    let data = {aaa:"!!!"};
    axios
      //.get(url, {
        .post(url,  data, config)    
      //      {     
      //     //  headers: {Authorization:`bearer ${jwtToken.token}`}

      //     //   headers: { 
      //     //     authorization: `Bearer ${jwtToken.token}`,
      //     //     accept: '*/*',
      //     //     host: 'localhost:3000',
      //     // },
          
      //       //     headers: {
      //     //     'authorization': jwtToken.token,
      //     //     'Accept' : 'application/json',
      //     //     'Content-Type': 'application/json'
      //     // }
      //    //   headers: {"Authorization" : `Bearer ${jwtToken.token}`}
         
      //       //headers: this.authHeader(), 
      //       //params: {currUserEmail},
      // })
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
          this.setState({ loading: false });
        }, 3000);
      })
      .catch((error) => {
        console.log(`Ошибка соединения:${error}`);
        this.setState({ loading: false });
      });
  }

  render() {
    const { bdRows } = this.props;
    return (
      <div>
        <Container>
          <MainInfo bdRows={bdRows} />
          <MainForm bdRows={bdRows} />
          <div>
            <Link to="/login">
              <button type="button">Войти</button>
            </Link>
            <Link to="/signup">
              <button type="button">Регистрация</button>
            </Link>
          </div>
          <Alert
            className="message__alert_center"
            variant="light"
            id="mainLabel"
          >
            {this.handlerLoading()}
          </Alert>
          <button type="button" onClick={this.handlerSaveToServer}>SaveToServer</button>
          <button type="button" onClick={this.handlerLoadFromServer}>LoadFromServer</button>
          <button type="button" onClick={this.handlerStartCronTasksOnServer}>StartCronTasks</button>
          <button type="button" onClick={this.handlerStopCronTasksOnServer}>StopCronTasks</button>
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
  goTo: (payload) => {
    dispatch(push(payload.path));
  },
  goOne: (payload) => {
    dispatch(go(payload.num));
  },
  back: () => {
    dispatch(goBack());
  },
  forw: () => {
    dispatch(goForward());
  },
  // delBdRow: newbdRow=>dispatch(delBdRow(newbdRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
