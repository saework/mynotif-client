import React, { useState, useRef } from "react";
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
  setBdPeriodVal: (bdPeriodVal: string) => void;
  bdPeriodVal: string,
}

function MainForm(props: IProps) {
  // const bdRows = props.bdRows;
  const [buttonAddName, setButtonAddName] = useState("Добавить");
  //const [bdPeriodVal, setBdPeriodVal] = useState(DEFAULTPERIOD);
 
 // const [persNameInpVal, setpersNameInpVal] = useState("");
  const [validated, setValidated] = useState(false);
  //const [datePick, setdatePick] = useState("");
  const [startDate, setStartDate] = useState<any>(
    setHours(setMinutes(new Date(), 0), 9)
  );

  // persName
  // bdDate
  // bdComm

  //const persNameRef = useRef();  ///!!!  
  const buttonAddRef = useRef<HTMLButtonElement>(null);
  const persNameRef = useRef<HTMLInputElement>(null);
  const bdCommValRef = useRef<HTMLTextAreaElement>(null);
  const bdTmzValRef = useRef<HTMLSelectElement>(null);
  const bdPeriodValRef = useRef<HTMLSelectElement>(null);

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

  const handleAddButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      //const buttonAdd = $("#buttonAdd").html();
      //const buttonAdd:string = (document.getElementById("buttonAdd") as HTMLButtonElement).innerHTML;
      let buttonAdd:string = "";
      if (buttonAddRef.current !== null) {
        buttonAdd = buttonAddRef.current.innerHTML as string;
      }

      //const persNameVal:string= $("#persName").val() as string;
      //const persNameVal:string = (document.getElementById("persName") as HTMLInputElement).value;  ///!!! comm
      //const persNameVal:string = (persNameRef.current as HTMLInputElement).value;
      let persNameVal:string = "";
      if (persNameRef.current !== null) {
        persNameVal = persNameRef.current.value as string;
      }

      
      //const bdDateVal:string = $("#bdDateTime").val() as string;
      //const bdDateVal:string = (document.getElementById("bdDateTime") as HTMLInputElement).value; 
      
      let bdDateVal:string = "";
      //console.log(startDate)
      //console.log(moment(startDate).format('DD.MM.YYYY, H:mm'))
      //const weekDay = Number(moment(date, 'DD.MM.YYYY').day());
      bdDateVal = String(moment(startDate).format('DD.MM.YYYY, H:mm'));
      // if (bdDateValRef.current !== null) {
      //   bdDateVal = bdDateValRef.current.value as string;
      // }
      

      //const bdCommVal:string = $("#bdComm").val() as string;
      //const bdCommVal:string = (document.getElementById("bdComm") as HTMLInputElement).value;
      
      let bdCommVal:string = "";
      if (bdCommValRef.current !== null) {
        bdCommVal = bdCommValRef.current.value as string;
      }

      //const bdTmzVal:string = $("#bdTmz").val() as string;
      //const bdTmzVal:string = (document.getElementById("bdTmz") as HTMLInputElement).value;
      
      let bdTmzVal:string = "";
      if (bdTmzValRef.current !== null) {
        bdTmzVal = bdTmzValRef.current.value as string;
      }

      //const bdPeriodVal:string = $("#bdPeriod").val() as string;
      //const bdPeriodVal:string = (document.getElementById("bdPeriod") as HTMLInputElement).value;
     
      ///!!! comm
      // let bdPeriodVal:string = "";
      // if (bdPeriodValRef.current !== null) {
      //   bdPeriodVal = bdPeriodValRef.current.value as string;
      // }
      ///!!! comm
     
      //console.log(bdDateVal);

      if (buttonAdd === "Добавить") {
        const newbdRow: IBdRow = {
          id: getCurrentId() + 1,
          persName: persNameVal,
          bdDate: bdDateVal,
          bdComm: bdCommVal,
          bdTmz: bdTmzVal,
          //bdPeriod: bdPeriodVal,
          bdPeriod: props.bdPeriodVal,

        };
        props.addBdRow(newbdRow);

        // const inputPersName = document.getElementById("persName");
        // if (inputPersName){
        //   inputPersName.focus();
        // }
        
         // очищаем поля
        if (bdCommValRef.current !== null) {
          bdCommValRef.current.value = "";
        }
        if (persNameRef.current !== null) {
          persNameRef.current.value = "";
          persNameRef.current.focus();
        }

      }
      if (buttonAdd === "Редактировать") {
        //const bdDate = moment(bdDateVal).format("DD.MM.YYYY");
        const newbdRow = {
          id: props.checkedId,
          persName: persNameVal,
          bdDate: bdDateVal,
          bdComm: bdCommVal,
          bdTmz: bdTmzVal,
          bdPeriod: props.bdPeriodVal
        };
        // console.log(newbdRow);
        props.editBdRow(newbdRow);
        //$("#buttonAdd").html("Добавить");
        //(document.getElementById("buttonAdd") as HTMLButtonElement).innerHTML = "Добавить";
        //document.getElementById("buttonAdd").innerHTML = "Добавить";

        // if (buttonAddRef.current !== null) {
        //   buttonAddRef.current.innerHTML = "Добавить";
        // }
        setButtonAddName("Добавить");

        // очищаем поля

        //$("#persName").val("");
        //document.getElementById("persName").value = "";
        //(document.getElementById("persName") as HTMLInputElement).value = "";
       
        // if (persNameRef.current !== null) {
        //   persNameRef.current.value = "";
        // }
        
        //$("#bdDate").val("");
        //document.getElementById("bdDate").value = "";
        //(document.getElementById("bdDate") as HTMLInputElement).value = "";
        //$("#bdComm").val("");

        //document.getElementById("bdComm").value = "";
        //(document.getElementById("bdComm") as HTMLInputElement).value = "";
        // $("#bdPeriod").val("");

        // if (bdCommValRef.current !== null) {
        //   bdCommValRef.current.value = "";
        // }

      }
    }
  };

  const handleBdPeriod = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bdPeriod: any = e.currentTarget;
    props.setBdPeriodVal(bdPeriod.value)
    //console.log(bdPeriod.value);
  }

  const handleDatePicker = (date:any):void => {
    //date = date && setStartDate(date);
    //setdatePick(date)
    setStartDate(date);
    //console.log(date)
  }
  return (
    <Row md={1} className="main-page__bd-form">
      <Col>
        <Form noValidate validated={validated} onSubmit={handleAddButtonClick}>
          <Form.Row>
          {/* <input type="text" ref={persNameRef}></input> */}
            <Form.Group as={Col} controlId="persName">

            {/* <Form.Group as={Col} controlId="persName" ref={persNameRef}> */}
              <Form.Label>Название уведомления:</Form.Label>
              <Form.Control required type="text" ref={persNameRef}/>
              <Form.Control.Feedback type="invalid">
                Заполните поле
              </Form.Control.Feedback>
              {/* <Form.Text className="text-muted">Название уведомления</Form.Text> */}
            </Form.Group>
            <Form.Group as={Col} controlId="bdDate">
              <Form.Label>Дата, время уведомления:</Form.Label>
              <DatePicker
                id="bdDateTime"
                className="form-control"
                locale="ru"
                selected={startDate}
                //onChange={date => date && setStartDate(date)}
                onChange={handleDatePicker}
                showTimeSelect
                // timeFormat="HH:mm"
                // dateFormat="mm dd, yyyy h:mm aa"
                dateFormat="Pp"
              />
            </Form.Group>

          </Form.Row>
          
          <Form.Row>
            <Form.Group as={Col} controlId="bdPeriod" >
              <Form.Label>Периодичность уведомления:</Form.Label>
              <Form.Control as="select" defaultValue={DEFAULTPERIOD} ref={bdPeriodValRef} onChange={handleBdPeriod} > 
                {periodArr.map((period: string)=> periodSelectField(period))}
              </Form.Control> 
            </Form.Group>

            <Form.Group as={Col} controlId="bdTmz">
              <Form.Label>Часовой пояс:</Form.Label>
              <Form.Control as="select" defaultValue={TIMEZONE} ref={bdTmzValRef} > 
                {tmzArr.map((tmzObj: any)=> tmzSelectField(tmzObj))}
              </Form.Control> 
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="bdComm">
            <Form.Label>Подробности по уведомлению:</Form.Label>
            <Form.Control as="textarea" rows={3} ref={bdCommValRef} />
          </Form.Group>

          {/* <Button type="submit" variant="success" size="lg" block>Добавить</Button> */}
          <Button id="buttonAdd" type="submit" variant="light" size="lg" block ref={buttonAddRef}>
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
