import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import momenttz from 'moment-timezone';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { getCurrentId } from '../functions';
import { addBdRow, editBdRow } from '../actions/actions';
import { IRootReducer, IBdRow, IStore, ItmzObj } from '../interfaces';
import config from '../configs/config';
import { sendBDtoServer } from '../api/home-api';

interface IProps {
  addBdRow: (newbdRow: IBdRow) => void;
  checkedId: number;
  editBdRow: (newbdRow: IBdRow) => void;
  bdPeriodVal: string;
  setBdPeriodVal: (bdPeriodVal: string) => void;
  buttonAddName: string;
  setButtonAddName: (buttonAddName: string) => void;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  persNameVal: string;
  setPersNameVal: (persNameVal: string) => void;
  bdCommVal: string;
  setBdCommVal: (bdCommVal: string) => void;
  bdTmzVal: string;
  setBdTmzVal: (bdTmzVal: string) => void;
  persNameRef: any;
  rootReducer: IRootReducer;
  currentUser: string;
  jwtToken: {};
  setFormVisible: (formVisible: boolean) => void;
  formVisible: boolean;
}

function MainForm(props: IProps) {
  const { persNameRef, persNameVal, startDate, bdPeriodVal, bdTmzVal, bdCommVal, buttonAddName, formVisible } = props;
  const [validated, setValidated] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<string>('');
  const [needSave, setNeedSave] = useState<boolean>(false);

  registerLocale('ru', ru);
  const { PERIOD_TITLES } = config;
  const timeZones = momenttz.tz.names();
  const tmzArr: ItmzObj[] = [];

  Object.keys(timeZones).forEach((i: any) => {
    const tmzObj: ItmzObj = {
      timeZoneValue: timeZones[i],
      timeZoneText: ` (GMT${moment.tz(timeZones[i]).format('Z')}) ${timeZones[i]}`,
    };
    tmzArr.push(tmzObj);
  });

  useEffect(() => {
    if (needSave) {
      handlerSaveToServer();
      setNeedSave(false);
    }
  });

  const tmzSelectField = (tmzObj: any) => (
    <option value={tmzObj.timeZoneValue} key={tmzObj.timeZoneValue}>
      {tmzObj.timeZoneText}
    </option>
  );
  const periodSelectField = (period: string) => (
    <option value={period} key={period}>
      {period}
    </option>
  );

  const handleAddButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (props.buttonAddName === 'Добавить заметку') {
      props.setButtonAddName('Добавить');
    }
    if (props.buttonAddName === 'Добавить') {
      props.setButtonAddName('Добавить заметку');
    }
    if (props.formVisible === false) {
      props.setFormVisible(true);
      return;
    }
    const form = e.currentTarget as HTMLFormElement;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      let bdDateVal: string = '';
      bdDateVal = moment(props.startDate).format('DD.MM.YYYY, H:mm');
      if (props.buttonAddName === 'Добавить') {
        const id = getCurrentId() + 1;
        const newbdRow: IBdRow = {
          id,
          persName: persNameVal,
          bdDate: bdDateVal,
          bdComm: bdCommVal,
          bdTmz: bdTmzVal,
          bdPeriod: bdPeriodVal,
        };
        props.addBdRow(newbdRow);
        props.setBdCommVal('');
        props.setPersNameVal('');
        if (props.persNameRef.current !== null) {
          props.persNameRef.current.focus();
        }
      }
      if (props.buttonAddName === 'Сохранить изменения') {
        const newbdRow = {
          id: props.checkedId,
          persName: persNameVal,
          bdDate: bdDateVal,
          bdComm: bdCommVal,
          bdTmz: bdTmzVal,
          bdPeriod: bdPeriodVal,
        };
        props.editBdRow(newbdRow);
        props.setButtonAddName('Добавить заметку');

        // Очищаем поля
        props.setPersNameVal('');
        props.setBdCommVal('');
      }
      setNeedSave(true);
      setValidated(false);
      props.setFormVisible(false);
    }
  };

  const handlerSaveToServer = () => {
    const { rootReducer, currentUser, jwtToken } = props;
    const data = {
      rootReducer,
      currentUser,
      jwtToken,
    };
    sendBDtoServer(data, setLoading);
  };

  const handleBdTmz = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bdTmz = e.currentTarget as HTMLSelectElement;
    props.setBdTmzVal(bdTmz.value);
  };
  const handleBdComm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bdComm = e.currentTarget as HTMLInputElement;
    props.setBdCommVal(bdComm.value);
  };
  const handlePersName = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const persName: any = e.currentTarget as HTMLInputElement;
    props.setPersNameVal(persName.value);
  };
  const handleBdPeriod = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bdPeriod: any = e.currentTarget as HTMLSelectElement;
    props.setBdPeriodVal(bdPeriod.value);
  };
  const handleDatePicker = (date: any): void => {
    props.setStartDate(date);
  };
  const handleBtnCancel = () => {
    props.setFormVisible(false);
    props.setButtonAddName('Добавить заметку');
  };

  return (
    <Row md={1} className="main-page__bd-form">
      <Col>
        <Form noValidate validated={validated} onSubmit={handleAddButtonClick}>
          {formVisible ? (
            <Form.Row>
              <Form.Group as={Col} controlId="persName">
                <Form.Label>Название уведомления:</Form.Label>
                <Form.Control required type="text" ref={persNameRef} onChange={handlePersName} value={persNameVal} />
                <Form.Control.Feedback type="invalid">Заполните поле</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="bdDate">
                <Form.Label>Дата, время уведомления:</Form.Label>
                <DatePicker id="bdDateTime" className="form-control" locale="ru" selected={startDate} onChange={handleDatePicker} showTimeSelect dateFormat="Pp" />
              </Form.Group>
            </Form.Row>
          ) : null}

          {formVisible ? (
            <Form.Row>
              <Form.Group as={Col} controlId="bdPeriod">
                <Form.Label>Повтор:</Form.Label>
                <Form.Control as="select" onChange={handleBdPeriod} value={bdPeriodVal}>
                  {PERIOD_TITLES.map((period: string) => periodSelectField(period))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="bdTmz">
                <Form.Label>Часовой пояс:</Form.Label>
                <Form.Control as="select" onChange={handleBdTmz} value={bdTmzVal}>
                  {tmzArr.map((tmzObj: any) => tmzSelectField(tmzObj))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          ) : null}

          {formVisible ? (
            <Form.Group controlId="bdComm">
              <Form.Label>Подробности по уведомлению:</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleBdComm} value={bdCommVal} />
            </Form.Group>
          ) : null}
          <div className="main-form__button-cont">
            <Button id="buttonAdd" type="submit" variant="success" size="lg" block className="main-form__button-add">
              {buttonAddName}
            </Button>
            {formVisible ? (
              <Button onClick={handleBtnCancel} id="buttonCancel" type="button" variant="danger" size="lg" block className="main-form__button-cancel">
                Отмена
              </Button>
            ) : null}
          </div>
        </Form>
      </Col>
    </Row>
  );
}
const mapStateToProps = (store: IStore) => ({
  bdRows: store.rootReducer.bdRows,
  checkedId: store.rootReducer.checkedId,
  rootReducer: store.rootReducer,
  currentUser: store.rootReducer.currentUser,
  jwtToken: store.rootReducer.jwtToken,
});
const mapDispatchToProps = (dispatch: any) => ({
  addBdRow: (newbdRow: IBdRow) => dispatch(addBdRow(newbdRow)),
  editBdRow: (editbdRow: IBdRow) => dispatch(editBdRow(editbdRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
