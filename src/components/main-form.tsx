import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import momenttz from 'moment-timezone';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { getCurrentId } from '../functions';
import { addBdRow, editBdRow } from '../actions/actions';
import { IBdRow, IStore, ItmzObj } from '../interfaces';
import config from '../configs/config';

registerLocale('ru', ru);

// const { TIMEZONE } = config;
// const { DEFAULTPERIOD } = config;
// const { periodArr } = config;
const { TIMEZONE, DEFAULTPERIOD, periodArr } = config;

const timeZones = momenttz.tz.names();
const tmzArr: ItmzObj[] = [];

// for (const i in timeZones) {
//   const tmzObj: ItmzObj = {
//     timeZoneValue: timeZones[i],
//     timeZoneText: ` (GMT${moment.tz(timeZones[i]).format('Z')}) ${timeZones[i]}`,
//   };
//   tmzArr.push(tmzObj);
// }
Object.keys(timeZones).forEach((i: any) => {
  const tmzObj: ItmzObj = {
    timeZoneValue: timeZones[i],
    timeZoneText: ` (GMT${moment.tz(timeZones[i]).format('Z')}) ${timeZones[i]}`,
  };
  tmzArr.push(tmzObj);
});

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
}

function MainForm(props: IProps) {
  const { persNameRef, persNameVal, startDate, bdPeriodVal, bdTmzVal, bdCommVal, buttonAddName } = props;

  const [validated, setValidated] = useState<boolean>(false);
  const tmzSelectField = (tmzObj: any) => <option value={tmzObj.timeZoneValue}>{tmzObj.timeZoneText}</option>;
  const periodSelectField = (period: string) => <option value={period}>{period}</option>;

  const handleAddButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
          // id: getCurrentId() + 1,
          // persName: props.persNameVal,
          // bdDate: bdDateVal,
          // bdComm: props.bdCommVal,
          // bdTmz: props.bdTmzVal,
          // bdPeriod: props.bdPeriodVal,
          persName: persNameVal,
          bdDate: bdDateVal,
          bdComm: bdCommVal,
          bdTmz: bdTmzVal,
          bdPeriod: bdPeriodVal,
        };
        props.addBdRow(newbdRow);
        console.log(newbdRow); // !!!
        props.setBdCommVal('');
        props.setPersNameVal('');
        if (props.persNameRef.current !== null) {
          props.persNameRef.current.focus();
        }
        // setValidated(false);
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
        props.setButtonAddName('Добавить');

        // очищаем поля
        props.setPersNameVal('');
        props.setBdCommVal('');
        // setValidated(false);
      }
      setValidated(false);
    }
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
  return (
    <Row md={1} className="main-page__bd-form">
      <Col>
        <Form noValidate validated={validated} onSubmit={handleAddButtonClick}>
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

          <Form.Row>
            <Form.Group as={Col} controlId="bdPeriod">
              <Form.Label>Повтор:</Form.Label>
              <Form.Control as="select" defaultValue={DEFAULTPERIOD} onChange={handleBdPeriod} value={bdPeriodVal}>
                {periodArr.map((period: string) => periodSelectField(period))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="bdTmz">
              <Form.Label>Часовой пояс:</Form.Label>
              <Form.Control as="select" defaultValue={TIMEZONE} onChange={handleBdTmz} value={bdTmzVal}>
                {tmzArr.map((tmzObj: any) => tmzSelectField(tmzObj))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="bdComm">
            <Form.Label>Подробности по уведомлению:</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={handleBdComm} value={bdCommVal} />
          </Form.Group>
          <Button id="buttonAdd" type="submit" variant="success" size="lg" block className="main-form__button-add">
            {/* Добавить */}
            {buttonAddName}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
const mapStateToProps = (store: IStore) => ({
  bdRows: store.rootReducer.bdRows,
  checkedId: store.rootReducer.checkedId,
});
const mapDispatchToProps = (dispatch: any) => ({
  addBdRow: (newbdRow: IBdRow) => dispatch(addBdRow(newbdRow)),
  editBdRow: (editbdRow: IBdRow) => dispatch(editBdRow(editbdRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
