import React, { useState, useEffect, useRef } from "react";
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
import _ from "lodash";
import { sendBDtoServer, loadBDfromServer } from "../api/home-api";

import moment from "moment";
import momenttz from "moment-timezone";
import DatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

// const TIMEZONE: string = "Asia/Yekaterinburg";
// const DEFAULTPERIOD: string = "Без повторов";
// const periodArr: string[] = ["Без повторов",  "Ежедневно", "Еженедельно", "ПН-ПТ", "Ежемесячно", "Ежегодно"];

const TIMEZONE = "Asia/Yekaterinburg";
const DEFAULTPERIOD = "Без повторов";
//const periodArr= ["Без повторов",  "Ежедневно", "Еженедельно", "ПН-ПТ", "Ежемесячно", "Ежегодно"];

function Home(props) {

const [loading, setLoading] = useState("");
const [needLoadData, setNeedLoadData] = useState("");

///!!!
const [buttonAddName, setButtonAddName] = useState("Добавить");
const [bdPeriodVal, setBdPeriodVal] = useState(DEFAULTPERIOD);
//const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 0), 9));
const [startDate, setStartDate] = useState(new Date())
const [persNameVal, setPersNameVal] = useState("");
const [bdCommVal, setBdCommVal] = useState("");
const [bdTmzVal, setBdTmzVal] = useState(TIMEZONE);

//const persNameRef = useRef<HTMLInputElement>(null);
const persNameRef = useRef(null);
///!!!


  useEffect(() => {
    const historyState = history.location.state;
    if (historyState){
     let needLoadData = historyState.needLoadData;
     console.log(needLoadData)
      if (needLoadData){
        //const currUserEmail = store.getState().rootReducer.currentUser;
        handlerLoadFromServer();
        //setNeedLoadData("");
        historyState.needLoadData = false;
        console.log(historyState.needLoadData)
      }
    }
  });

    let handlerLoading = ()=> {
    if (loading === ""){
      return ""
    }
    if (loading === "load"){
    return "Загрузка данных.."
    }
    if (loading === "save"){
    return "Сохранение данных.."
    }
  }

  let handleExitButtonClick = ()=> {
    localStorage.removeItem("loginData");
    history.push({
      pathname: '/login'
    })
    const loginData={
      currentUser: '',
      jwtToken: ''
    }
    props.loginSaveStore(loginData);
  }
 
  // Сохранить список на сервер

  let handlerSaveToServer = ()=> {
    const bdRows = store.getState().rootReducer;
    const currUserEmail = store.getState().rootReducer.currentUser;
    const jwtToken = store.getState().rootReducer.jwtToken;
    const data = {
      bdRows,
      currUserEmail,
      jwtToken
    };
    sendBDtoServer(data, setLoading);
  };

  let handlerLoadFromServer = ()=> {
    const currUserEmail = store.getState().rootReducer.currentUser;
    console.log(currUserEmail);
    loadBDfromServer(currUserEmail, setLoading);
  };
    const { bdRows } = props;
    return (
      <div>
        <Container>
          {/* <MainInfo bdRows={bdRows} /> */}
          {/* <MainForm bdRows={bdRows} /> */}
          <MainInfo 
            bdRows={bdRows}
            bdPeriodVal={bdPeriodVal} setBdPeriodVal={setBdPeriodVal}
            buttonAddName={buttonAddName} setButtonAddName={setButtonAddName}
            startDate={startDate} setStartDate={setStartDate}
            persNameVal={persNameVal} setPersNameVal={setPersNameVal}
            bdCommVal={bdCommVal} setBdCommVal={setBdCommVal}
            bdTmzVal={bdTmzVal} setBdTmzVal={setBdTmzVal}
            persNameRef={persNameRef}
            
            />
          <MainForm
            bdRows={bdRows}
            bdPeriodVal={bdPeriodVal} setBdPeriodVal={setBdPeriodVal}
            buttonAddName={buttonAddName} setButtonAddName={setButtonAddName}
            startDate={startDate} setStartDate={setStartDate}
            persNameVal={persNameVal} setPersNameVal={setPersNameVal}
            bdCommVal={bdCommVal} setBdCommVal={setBdCommVal}
            bdTmzVal={bdTmzVal} setBdTmzVal={setBdTmzVal}
            persNameRef={persNameRef}
            />
          <Alert
            className="message__alert_center"
            variant="light"
            id="mainLabel"
          >
            {handlerLoading()}
          </Alert>
      <Row>
        <Col>
          <Button id="buttonSave" type="button" variant="info" size="lg" block onClick={handlerSaveToServer} className="home__button">
            Сохранить список
          </Button>
        </Col>
        <Col>
        <Button id="buttonCancel" type="button" variant="info" size="lg" block onClick={handlerLoadFromServer} className="home__button">
            {/* Отменить изменения */}
            Загрузить список
        </Button>
        </Col>
        <Col>
        <Button id="buttonExit" type="button" variant="danger" size="lg" block onClick={handleExitButtonClick} className="home__button">
            Выйти из аккаунта
        </Button>
        </Col>
      </Row>
        </Container>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
