import React, { useState, useEffect, useRef } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../style.scss';
import { sendBDtoServer, loadBDfromServer } from '../api/home-api';
import { history } from '../store/store';
import MainForm from '../components/main-form';
import MainInfo from '../components/main-info';
import config from '../configs/config';
import { IRootReducer, IStore } from '../interfaces';

interface IProps {
  rootReducer: IRootReducer;
  currentUser: string;
  jwtToken: {};
}

function Home(props: IProps) {
  const { rootReducer, currentUser, jwtToken } = props;
  const { TIME_ZONE, DEFAULT_PERIOD } = config;
  const [loading, setLoading] = useState<string>('');
  const [buttonAddName, setButtonAddName] = useState<string>('Добавить заметку');
  const [bdPeriodVal, setBdPeriodVal] = useState<string>(DEFAULT_PERIOD);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [persNameVal, setPersNameVal] = useState<string>('');
  const [bdCommVal, setBdCommVal] = useState<string>('');
  const [bdTmzVal, setBdTmzVal] = useState<string>(TIME_ZONE);
  const [formVisible, setFormVisible] = useState<boolean>(false);

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

  // Сохранить список задач пользователя на сервер
  const handlerSaveToServer = () => {
    const data = {
      rootReducer,
      currentUser,
      jwtToken,
    };
    sendBDtoServer(data, setLoading);
  };

  const handlerLoadFromServer = () => {
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
          handlerSaveToServer={handlerSaveToServer}
          setFormVisible={setFormVisible}
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
          formVisible={formVisible}
          setFormVisible={setFormVisible}
        />
        <Alert className="message__alert_center" variant="light" id="mainLabel">
          {handlerLoading()}
        </Alert>
      </Container>
    </div>
  );
}

const mapStateToProps = (store: IStore) => ({
  rootReducer: store.rootReducer,
  currentUser: store.rootReducer.currentUser,
  jwtToken: store.rootReducer.jwtToken,
});

export default connect(mapStateToProps)(Home);
