import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Alert, Row, Col, Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
// import {
//   push, go, goBack, goForward
// } from 'connected-react-router';
import '../style.scss';
import { sendBDtoServer, loadBDfromServer } from '../api/home-api';
import { loginSaveStore, resetStore } from '../actions/actions';
import { history } from '../store/store';
import MainForm from '../components/main-form';
import MainInfo from '../components/main-info';
import config from '../configs/config';
import consoleLog from '../configs/console-log';

// const { TIMEZONE } = config;
// const { DEFAULTPERIOD } = config;
const { TIMEZONE, DEFAULTPERIOD } = config;

function Home(props) {
  const [loading, setLoading] = useState('');
  const [buttonAddName, setButtonAddName] = useState('Добавить');
  const [bdPeriodVal, setBdPeriodVal] = useState(DEFAULTPERIOD);
  const [startDate, setStartDate] = useState(new Date());
  const [persNameVal, setPersNameVal] = useState('');
  const [bdCommVal, setBdCommVal] = useState('');
  const [bdTmzVal, setBdTmzVal] = useState(TIMEZONE);

  // const persNameRef = useRef<HTMLInputElement>(null);
  const persNameRef = useRef(null);

  useEffect(() => {
    const historyState = history.location.state;
    if (historyState) {
      const { needLoadData } = historyState;
      consoleLog(`useEffect - needLoadData - needLoadData: ${needLoadData}`);
      if (needLoadData) {
        handlerLoadFromServer();
        historyState.needLoadData = false;
      }
    }
  });

  const handlerLoading = () => {
    if (loading === '') {
      return '';
    }
    if (loading === 'load') {
      return 'Загрузка данных..';
    }
    if (loading === 'save') {
      return 'Сохранение данных..';
    }
  };

  const handleExitButtonClick = () => {
    localStorage.removeItem('loginData');
    history.push({
      pathname: '/login',
    });
    props.resetStore();
  };

  // Сохранить список на сервер
  const handlerSaveToServer = () => {
    // const bdRows = store.getState().rootReducer;
    // const currUserEmail = store.getState().rootReducer.currentUser;
    // const { jwtToken } = store.getState().rootReducer;
    const { bdRows, currUserEmail, jwtToken } = props;
    const data = {
      bdRows,
      currUserEmail,
      jwtToken,
    };
    sendBDtoServer(data, setLoading);
  };

  let handlerLoadFromServer = () => {
    const { currUserEmail } = props;
    // const currUserEmail = store.getState().rootReducer.currentUser;
    loadBDfromServer(currUserEmail, setLoading);
  };
  const { bdRows } = props;
  return (
    <div>
      <Container>
        <MainInfo
          bdRows={bdRows}
          bdPeriodVal={bdPeriodVal}
          setBdPeriodVal={setBdPeriodVal}
          buttonAddName={buttonAddName}
          setButtonAddName={setButtonAddName}
          startDate={startDate}
          setStartDate={setStartDate}
          persNameVal={persNameVal}
          setPersNameVal={setPersNameVal}
          bdCommVal={bdCommVal}
          setBdCommVal={setBdCommVal}
          bdTmzVal={bdTmzVal}
          setBdTmzVal={setBdTmzVal}
          persNameRef={persNameRef}
        />
        <MainForm
          bdRows={bdRows}
          bdPeriodVal={bdPeriodVal}
          setBdPeriodVal={setBdPeriodVal}
          buttonAddName={buttonAddName}
          setButtonAddName={setButtonAddName}
          startDate={startDate}
          setStartDate={setStartDate}
          persNameVal={persNameVal}
          setPersNameVal={setPersNameVal}
          bdCommVal={bdCommVal}
          setBdCommVal={setBdCommVal}
          bdTmzVal={bdTmzVal}
          setBdTmzVal={setBdTmzVal}
          persNameRef={persNameRef}
        />
        <Alert className="message__alert_center" variant="light" id="mainLabel">
          {handlerLoading()}
        </Alert>
        <Row>
          <Col>
            <Button
              id="buttonSave"
              type="button"
              variant="info"
              size="lg"
              block
              onClick={handlerSaveToServer}
              className="home__button"
            >
              Сохранить список
            </Button>
          </Col>
          <Col>
            <Button
              id="buttonCancel"
              type="button"
              variant="info"
              size="lg"
              block
              onClick={handlerLoadFromServer}
              className="home__button"
            >
              Загрузить список
            </Button>
          </Col>
          <Col>
            <Button
              id="buttonExit"
              type="button"
              variant="danger"
              size="lg"
              block
              onClick={handleExitButtonClick}
              className="home__button"
            >
              Выйти из аккаунта
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (store) => ({
  bdRows: store.rootReducer.bdRows,
  currentUser: store.rootReducer.currentUser,
  jwtToken: store.rootReducer.jwtToken,
});
const mapDispatchToProps = (dispatch) => ({
  // goTo: (payload) => {
  //   dispatch(push(payload.path));
  // },
  // goOne: (payload) => {
  //   dispatch(go(payload.num));
  // },
  // back: () => {
  //   dispatch(goBack());
  // },
  // forw: () => {
  //   dispatch(goForward());
  // },
  loginSaveStore: (loginData) => dispatch(loginSaveStore(loginData)),
  resetStore: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
