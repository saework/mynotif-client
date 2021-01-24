import React, { useState } from "react";
import {
  Row, Col, Form, Button
} from "react-bootstrap";
import $ from "jquery";
import { connect } from "react-redux";
// import Functions from "../functions";
import moment from "moment";
import momenttz from "moment-timezone";
import DatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import { getCurrentId } from "../functions";
import { addBdRow, editBdRow } from "../actions/actions";
import { IAction, IRootReducer, IBdRows, IBdRow, IStore, ItmzObj } from "../interfaces";
import { history } from "../store/store";
registerLocale('ru', ru)

// import { store } from "../store/store";
// import { extendWith } from "lodash";
const TIMEZONE: string = "Asia/Yekaterinburg";
const DEFAULTPERIOD: string = "Без повторов";
const periodArr: string[] = ["Без повторов",  "Ежедневно", "Еженедельно", "ПН-ПТ", "Ежемесячно", "Ежегодно"];
//const TIMEZONE = "Europe/Moscow";

const timeZones = momenttz.tz.names();
const tmzArr: ItmzObj[]=[];
for(let i in timeZones)
{
  const tmzObj: ItmzObj =
  {timeZoneValue:  timeZones[i],
   timeZoneText: " (GMT"+moment.tz(timeZones[i]).format('Z')+") " + timeZones[i]}
   tmzArr.push(tmzObj);
}

interface IProps {
  addBdRow: (newbdRow: IBdRow) => void;
  checkedId: number;
  editBdRow: (newbdRow: IBdRow) => void;
}

function MainForm(props: IProps) {
  // const bdRows = props.bdRows;
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState<any>(
    setHours(setMinutes(new Date(), 0), 9)
  );

  const tmzSelectField = (tmzObj: any) => {
    return(
      <option value={tmzObj.timeZoneValue}>{tmzObj.timeZoneText}</option>
    )
  }
  const periodSelectField = (period: string) => {
    return(
      <option value={period}>{period}</option>
    )
  }

  // const handleSaveButtonClick = (e: React.SyntheticEvent) => {
  //   //e.preventDefault();
  
  // }
  // const handleCancelButtonClick = (e: React.SyntheticEvent) => {
  //   //e.preventDefault();
  
  // }
  // const handleExitButtonClick = (e: React.SyntheticEvent) => {
  //   //e.preventDefault();
  //   //localStorage.setItem("jwt", JSON.stringify(jwt));
  //   localStorage.removeItem("jwt");
  //   history.push({
  //     pathname: '/login'
  //   })
  // }
  

  const handleAddButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      const buttonAdd = $("#buttonAdd").html();
      const persNameVal:string= $("#persName").val() as string;
      const bdDateVal:string = $("#bdDateTime").val() as string;
      const bdCommVal:string = $("#bdComm").val() as string;
      const bdTmzVal:string = $("#bdTmz").val() as string;
      const bdPeriodVal:string = $("#bdPeriod").val() as string;
      
      //console.log(bdDateVal);

      if (buttonAdd === "Добавить") {
        const newbdRow: IBdRow = {
          id: getCurrentId() + 1,
          persName: persNameVal,
          bdDate: bdDateVal,
          bdComm: bdCommVal,
          bdTmz: bdTmzVal,
          bdPeriod: bdPeriodVal,
        };
        props.addBdRow(newbdRow);
        //document.getElementById("persName").focus();
        const inputPersName = document.getElementById("persName");
        //const inputPersName = document.getElementById("buttonAdd");
        
        if (inputPersName){
          inputPersName.focus();
        }
        //: HTMLElement
      }
      if (buttonAdd === "Редактировать") {
        //const bdDate = moment(bdDateVal).format("DD.MM.YYYY");
        const newbdRow = {
          id: props.checkedId,
          persName: persNameVal,
          bdDate: bdDateVal,
          bdComm: bdCommVal,
          bdTmz: bdTmzVal,
          bdPeriod: bdPeriodVal
        };
        // console.log(newbdRow);
        props.editBdRow(newbdRow);
        $("#buttonAdd").html("Добавить");
        // очищаем поля
        $("#persName").val("");
        $("#bdDate").val("");
        $("#bdComm").val("");
        // $("#bdPeriod").val("");
      }
    }
  };
  return (
    <Row md={1} className="main-page__bd-form">
      <Col>
        <Form noValidate validated={validated} onSubmit={handleAddButtonClick}>
          <Form.Row>
            <Form.Group as={Col} controlId="persName">
              <Form.Label>Название уведомления:</Form.Label>
              <Form.Control required type="text" />
              <Form.Control.Feedback type="invalid">
                Заполните поле
              </Form.Control.Feedback>
              {/* <Form.Text className="text-muted">Название уведомления</Form.Text> */}
            </Form.Group>

            {/* <Form.Group as={Col} controlId="bdDate">
              <Form.Label>Дата, время уведомления:</Form.Label>
              <Form.Control required type="date" placeholder="01.02.1989" />
              <Form.Control.Feedback type="invalid">
                Заполните поле
              </Form.Control.Feedback>
            </Form.Group> */}

            <Form.Group as={Col} controlId="bdDate">
              <Form.Label>Дата, время уведомления:</Form.Label>
              <DatePicker
                id="bdDateTime"
                className="form-control"
                locale="ru"
                selected={startDate}
                onChange={date => date && setStartDate(date)}
                showTimeSelect
                // timeFormat="HH:mm"
                // dateFormat="mm dd, yyyy h:mm aa"
                dateFormat="Pp"
              />
            </Form.Group>

          </Form.Row>
          
          <Form.Row>
            <Form.Group as={Col} controlId="bdPeriod">
              <Form.Label>Периодичность уведомления:</Form.Label>
              <Form.Control as="select" defaultValue={DEFAULTPERIOD}> 
                {periodArr.map((period: string)=> periodSelectField(period))}
              </Form.Control> 
            </Form.Group>

            <Form.Group as={Col} controlId="bdTmz">
              <Form.Label>Часовой пояс:</Form.Label>
              <Form.Control as="select" defaultValue={TIMEZONE}> 
                {tmzArr.map((tmzObj: any)=> tmzSelectField(tmzObj))}
              </Form.Control> 
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="bdComm">
            <Form.Label>Подробности по уведомлению:</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          {/* <Button type="submit" variant="success" size="lg" block>Добавить</Button> */}
          <Button id="buttonAdd" type="submit" variant="light" size="lg" block>
            Добавить
          </Button>
        </Form>


        {/* <Row>
        <Button id="buttonSave" type="button" variant="light" size="lg" block>
          Сохранить
        </Button>
        <Button id="buttonCancel" type="button" variant="light" size="lg" block>
           Отмена
        </Button>
        </Row> */}

      {/* <Row>
        <Col>
          <Button id="buttonSave" type="button" variant="light" size="lg" block onClick={handleSaveButtonClick}>
            Сохранить список
          </Button>
        </Col>
        <Col>
        <Button id="buttonCancel" type="button" variant="light" size="lg" block onClick={handleCancelButtonClick}>
            Отменить изменения
        </Button>
        </Col>
        <Col>
        <Button id="buttonExit" type="button" variant="light" size="lg" block onClick={handleExitButtonClick}>
            Выйти из аккаунта
        </Button>
        </Col>
      </Row> */}

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
