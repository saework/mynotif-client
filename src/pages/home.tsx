import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Alert, Row, Col, Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import '../style.scss';
import { sendBDtoServer, loadBDfromServer } from '../api/home-api';
import { resetStore } from '../actions/actions';
import { history } from '../store/store';
import MainForm from '../components/main-form';
import MainInfo from '../components/main-info';
import config from '../configs/config';
import { IRootReducer, IStore } from '../interfaces';

const { TIMEZONE, DEFAULTPERIOD } = config;

interface IProps {
  rootReducer: IRootReducer;
  currentUser: string;
  jwtToken: {};
  resetStore: () => void;
}

function Home(props: IProps) {
  const [loading, setLoading] = useState<string>('');
  const [buttonAddName, setButtonAddName] = useState<string>('Добавить');
  const [bdPeriodVal, setBdPeriodVal] = useState<string>(DEFAULTPERIOD);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [persNameVal, setPersNameVal] = useState<string>('');
  const [bdCommVal, setBdCommVal] = useState<string>('');
  const [bdTmzVal, setBdTmzVal] = useState<string>(TIMEZONE);

  const persNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const historyState: any = history.location.state;
    if (historyState) {
      const { needLoadData } = historyState;
      console.log(`useEffect - needLoadData - needLoadData: ${needLoadData}`);
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

  // Сохранить список задач пользователя на сервер
  const handlerSaveToServer = () => {
    const { rootReducer, currentUser, jwtToken } = props;
    const data = {
      rootReducer,
      currentUser,
      jwtToken,
    };
    sendBDtoServer(data, setLoading);
  };

  let handlerLoadFromServer = () => {
    const { currentUser } = props;
    loadBDfromServer(currentUser, setLoading);
  };

  return (
    <div>
      <Container>
        <MainInfo
          setBdPeriodVal={setBdPeriodVal}
          setButtonAddName={setButtonAddName}
          setStartDate={setStartDate}
          setPersNameVal={setPersNameVal}
          setBdCommVal={setBdCommVal}
          setBdTmzVal={setBdTmzVal}
          persNameRef={persNameRef}
        />
        <MainForm
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

const mapStateToProps = (store: IStore) => ({
  rootReducer: store.rootReducer,
  currentUser: store.rootReducer.currentUser,
  jwtToken: store.rootReducer.jwtToken,
});
const mapDispatchToProps = (dispatch: any) => ({
  resetStore: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
