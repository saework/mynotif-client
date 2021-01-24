import React from "react";
import { Container, Alert, Row, Col, Button } from "react-bootstrap";
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
import { loadBD, loginSaveStore } from "../actions/actions";

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
    this.state = { loading: "" };
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

  getLoginData=(dataType)=>{
    const loginData = JSON.parse(localStorage.getItem('loginData'));
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

  // authHeader = () => {
  //   const loginData = JSON.parse(localStorage.getItem('loginData'));
  //   let res = {};
  //   if (loginData){
  //     const jwt = loginData.jwt
  //     if (jwt) {
  //       res = { Authorization: 'Bearer ' + jwt };
  //     }
  //   }
  //   return res;
  // }

  handlerLoading = () =>{
    // eslint-disable-next-line react/destructuring-assignment
   // (this.state.loading === true ? "Загрузка данных.." : "");
   if (this.state.loading === ""){
     return ""
   }
   if (this.state.loading === "load"){
    return "Загрузка данных.."
   }
   if (this.state.loading === "save"){
    return "Сохранение данных.."
   }
  }

  handleExitButtonClick = () => {
    //e.preventDefault();
    //localStorage.setItem("jwt", JSON.stringify(jwt));
    //localStorage.removeItem("jwt");
    localStorage.removeItem("loginData");
    history.push({
      pathname: '/login'
    })
    const loginData={
      currentUser: '',
      jwtToken: ''

    }
    this.props.loginSaveStore(loginData);
  }
 
  // Сохранить список на сервер
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



  // // запустить задачи
  // handlerStartCronTasksOnServer = () => {
  //   const data = "startCronTasks";
  //   this.sendBDtoServer(data);
  //   // console.log(data);
  //   //console.log(repeatMap.norep);
    

  //   // const currDate = new Date();
  //   // const currMonth = Number(currDate.getMonth());
  //   // console.log(currDate);
  //   // console.log(currDate.getMonth());
  //   // console.log(currMonth);
  //   //const currDate = new Date();
  //   // const currDate = "11.01.2021";
  //   //  console.log(new Date().getDay());
  //   //  console.log(Number("1"));
  //   // console.log(moment(currDate, "DD.MM.YYYY").day());
  //  // console.log(moment(currDate, "DD.MM.YYYY").date());

  // };
  // // остановить задачи
  // handlerStopCronTasksOnServer = () => {
  //   const data = "stopCronTasks";
  //   // console.log(data);
  //   this.sendBDtoServer(data);
  // };

  handlerLoadFromServer = () => {
    const currUserEmail = store.getState().rootReducer.currentUser;
    console.log(currUserEmail);
    this.loadBDfromServer(currUserEmail);
  };

  // отправить данные в БД POST-запрос
  sendBDtoServer(data) {
    this.setState({ loading: "save" });
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
            this.setState({ loading: "" });
          }, 2000);
        }
      })
      .catch((error) => {
        this.setState({ loading: "" });
        console.log(`Ошибка соединения:${error}`);
      });
  }

  // получить данные из БД через GET-запрос
  loadBDfromServer(currUserEmail) {
    this.setState({ loading: "load" });
    const url = "http://localhost:3000/load";
    // const url = "/load?currUserEmail=" + currUserEmail;
    //const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdEB0ZXN0IiwiaWF0IjoxNjExMTMxMjYwfQ.i3s6T950gGaERqmvTPFOFPIA5XS3HBdxFJ4mEPt9Ahk"
    //const jwtToken = this.authHeader()
    //const jwtToken= JSON.parse(localStorage.getItem('jwt').token);
    //const jwtToken= JSON.parse(localStorage.getItem('jwt'));
    const jwtAuthHeader =  this.getLoginData("jwtAuthHeader")
    if (jwtAuthHeader){
      console.log(jwtAuthHeader);
      let config = {
        headers: {
          Authorization:`bearer ${jwtAuthHeader}`
          // accept: '*/*',
          // host: 'localhost:3000',
        }
      }
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
          this.setState({ loading: "" });
        }, 2000);
      })
      .catch((error) => {
        console.log(`Ошибка соединения:${error}`);
        this.setState({ loading: "" });
      });
    }else{
      history.push({
        pathname: '/login',
      })
    }
  }

  render() {
    const { bdRows } = this.props;
    return (
      <div>
        <Container>
          <MainInfo bdRows={bdRows} />
          <MainForm bdRows={bdRows} />
          {/* <div>
            <Link to="/login">
              <button type="button">Войти</button>
            </Link>
            <Link to="/signup">
              <button type="button">Регистрация</button>
            </Link>
          </div> */}
          <Alert
            className="message__alert_center"
            variant="light"
            id="mainLabel"
          >
            {this.handlerLoading()}
          </Alert>
          {/* <button type="button" onClick={this.handlerSaveToServer}>SaveToServer</button>
          <button type="button" onClick={this.handlerLoadFromServer}>LoadFromServer</button>
          <button type="button" onClick={this.handlerStartCronTasksOnServer}>StartCronTasks</button>
          <button type="button" onClick={this.handlerStopCronTasksOnServer}>StopCronTasks</button> */}

      <Row>
        <Col>
          <Button id="buttonSave" type="button" variant="light" size="lg" block onClick={this.handlerSaveToServer}>
            Сохранить список
          </Button>
        </Col>
        <Col>
        <Button id="buttonCancel" type="button" variant="light" size="lg" block onClick={this.handlerLoadFromServer}>
            Отменить изменения
        </Button>
        </Col>
        <Col>
        <Button id="buttonExit" type="button" variant="light" size="lg" block onClick={this.handleExitButtonClick}>
            Выйти из аккаунта
        </Button>
        </Col>
      </Row>

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
  loginSaveStore: (loginData) => dispatch(loginSaveStore(loginData)),
  // delBdRow: newbdRow=>dispatch(delBdRow(newbdRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
