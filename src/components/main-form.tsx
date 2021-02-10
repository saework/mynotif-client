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
  bdPeriodVal: string;
  setBdPeriodVal: (bdPeriodVal: string) => void;
  buttonAddName: string;
  setButtonAddName: (buttonAddName: string) => void;
  startDate: any;
  setStartDate: (startDate: string) => void;
  persNameVal: string;
  setPersNameVal: (persNameVal: string) => void;
  bdCommVal: string;
  setBdCommVal: (bdCommVal: string) => void; 
  bdTmzVal: string;
  setBdTmzVal: (bdTmzVal: string) => void; 
  persNameRef: any; 
}

// bdPeriodVal={bdPeriodVal} setBdPeriodVal={setBdPeriodVal}
// buttonAddName={buttonAddName} setButtonAddName={setButtonAddName}
// startDate={startDate} setStartDate={setStartDate}
// persNameVal={persNameVal} setPersNameVal={setPersNameVal}
// bdCommVal={bdCommVal} setBdCommVal={setBdCommVal}
// bdTmzVal={bdTmzVal} setBdTmzVal={setBdTmzVal}


function MainForm(props: IProps) {
  const [validated, setValidated] = useState(false);
  // const bdRows = props.bdRows;
  //const [buttonAddName, setButtonAddName] = useState("Добавить");
  //const [bdPeriodVal, setBdPeriodVal] = useState(DEFAULTPERIOD);
  //const [startDate, setStartDate] = useState<any>(setHours(setMinutes(new Date(), 0), 9));
  
  //const [persNameVal, setPersNameVal] = useState("");
  //const [bdCommVal, setBdCommVal] = useState("");
  //const [bdTmzVal, setBdTmzVal] = useState("");

  ////const [datePick, setdatePick] = useState("");
  //// const [persNameInpVal, setpersNameInpVal] = useState("");
  // persName
  // bdDate
  // bdComm

  //const persNameRef = useRef();  ///!!!  
  //const buttonAddRef = useRef<HTMLButtonElement>(null);
  //const persNameRef = useRef<HTMLInputElement>(null);
  //const bdCommValRef = useRef<HTMLTextAreaElement>(null);
  //const bdTmzValRef = useRef<HTMLSelectElement>(null);
  //const bdPeriodValRef = useRef<HTMLSelectElement>(null);

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
     
      // let buttonAdd:string = "";
      // if (buttonAddRef.current !== null) {
      //   buttonAdd = buttonAddRef.current.innerHTML as string;
      // }

      //const persNameVal:string= $("#persName").val() as string;
      //const persNameVal:string = (document.getElementById("persName") as HTMLInputElement).value;  ///!!! comm
      //const persNameVal:string = (persNameRef.current as HTMLInputElement).value;
     
      // let persNameVal:string = "";
      // if (persNameRef.current !== null) {
      //   persNameVal = persNameRef.current.value as string;
      // }

      
      //const bdDateVal:string = $("#bdDateTime").val() as string;
      //const bdDateVal:string = (document.getElementById("bdDateTime") as HTMLInputElement).value; //!!!
      
      //let bdDateVal:string = "";
      //console.log(startDate)
      //console.log(moment(startDate).format('DD.MM.YYYY, H:mm'))
      //const weekDay = Number(moment(date, 'DD.MM.YYYY').day());

      let bdDateVal:string = ""; ///!!!
      bdDateVal = moment(props.startDate).format('DD.MM.YYYY, H:mm');

      //bdDateVal = (moment(props.startDate).format('DD.MM.YYYY, H:mm'));  dd.mm.yyyy, HH:mm
      //bdDateVal = String(props.startDate);  ///!!!
      //bdDateVal = String(moment(props.startDate).format('dd.mm.yyyy, HH:mm'));
      
      // if (bdDateValRef.current !== null) {
      //   bdDateVal = bdDateValRef.current.value as string;
      // }
      

      //const bdCommVal:string = $("#bdComm").val() as string;
      //const bdCommVal:string = (document.getElementById("bdComm") as HTMLInputElement).value;
      
      // let bdCommVal:string = "";
      // if (bdCommValRef.current !== null) {
      //   bdCommVal = bdCommValRef.current.value as string;
      // }

      //const bdTmzVal:string = $("#bdTmz").val() as string;
      //const bdTmzVal:string = (document.getElementById("bdTmz") as HTMLInputElement).value;
      
      // let bdTmzVal:string = "";
      // if (bdTmzValRef.current !== null) {
      //   bdTmzVal = bdTmzValRef.current.value as string;
      // }

      //const bdPeriodVal:string = $("#bdPeriod").val() as string;
      //const bdPeriodVal:string = (document.getElementById("bdPeriod") as HTMLInputElement).value;
     
      ///!!! comm
      // let bdPeriodVal:string = "";
      // if (bdPeriodValRef.current !== null) {
      //   bdPeriodVal = bdPeriodValRef.current.value as string;
      // }
      ///!!! comm
     
      //console.log(bdDateVal);

      if (props.buttonAddName === "Добавить") {
        const newbdRow: IBdRow = {
          id: getCurrentId() + 1,
          persName: props.persNameVal,
          bdDate: bdDateVal,
          bdComm: props.bdCommVal,
          bdTmz: props.bdTmzVal,
          //bdPeriod: bdPeriodVal,
          bdPeriod: props.bdPeriodVal,

        };
        props.addBdRow(newbdRow);

        // const inputPersName = document.getElementById("persName");
        // if (inputPersName){
        //   inputPersName.focus();
        // }
        
         // очищаем поля
        // if (bdCommValRef.current !== null) {
        //   bdCommValRef.current.value = "";
        // }
        // if (persNameRef.current !== null) {
        //   persNameRef.current.value = "";
        //   persNameRef.current.focus();
        // }
        props.setBdCommVal("");
        props.setPersNameVal("");
        if (props.persNameRef.current !== null) {
          props.persNameRef.current.focus();
        }
        setValidated(false);

      }
      if (props.buttonAddName === "Сохранить изменения") {
        //const bdDate = moment(bdDateVal).format("DD.MM.YYYY");
        const newbdRow = {
          id: props.checkedId,
          persName: props.persNameVal,
          bdDate: bdDateVal,
          bdComm: props.bdCommVal,
          bdTmz: props.bdTmzVal,
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
        props.setButtonAddName("Добавить");

        // очищаем поля
        props.setPersNameVal("");
        props.setBdCommVal("");
        setValidated(false);
        
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
  const handleBdTmz = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bdTmz: any = e.currentTarget;
    props.setBdTmzVal(bdTmz.value)
    //console.log(bdPeriod.value);
  }
  const handleBdComm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bdComm: any = e.currentTarget;
    props.setBdCommVal(bdComm.value)
    //console.log(bdPeriod.value);
  }
  const handlePersName = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const persName: any = e.currentTarget;
    props.setPersNameVal(persName.value)
    //console.log(bdPeriod.value);
  }
  const handleBdPeriod = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bdPeriod: any = e.currentTarget;
    props.setBdPeriodVal(bdPeriod.value)
    //console.log(bdPeriod.value);
  }
  const handleDatePicker = (date:any):void => {
    //date = date && setStartDate(date);
    //setdatePick(date)
    //console.log(date.format())
    console.log(date)
    props.setStartDate(date);
   //props.setStartDate(date.format());
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
              <Form.Control required type="text" ref={props.persNameRef} onChange={handlePersName} value ={props.persNameVal}/>
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
                selected={props.startDate}
                //selected={startDate}
                //onChange={date => date && setStartDate(date)}
                onChange={handleDatePicker}
                showTimeSelect
                // timeFormat="HH:mm"
                // dateFormat="mm dd, yyyy h:mm aa"
                dateFormat="Pp"
                //dateFormat="dd.mm.yyyy, HH:mm"
              />
            </Form.Group>

          </Form.Row>
          
          <Form.Row>
            <Form.Group as={Col} controlId="bdPeriod" >
              {/* <Form.Label>Периодичность уведомления:</Form.Label> */}
              <Form.Label>Повтор:</Form.Label>
              <Form.Control as="select" defaultValue={DEFAULTPERIOD} onChange={handleBdPeriod}  value ={props.bdPeriodVal}> 
                {periodArr.map((period: string)=> periodSelectField(period))}
              </Form.Control> 
            </Form.Group>

            <Form.Group as={Col} controlId="bdTmz">
              <Form.Label>Часовой пояс:</Form.Label>
              <Form.Control as="select" defaultValue={TIMEZONE} onChange={handleBdTmz} value ={props.bdTmzVal}> 
                {tmzArr.map((tmzObj: any)=> tmzSelectField(tmzObj))}
              </Form.Control> 
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="bdComm">
            <Form.Label>Подробности по уведомлению:</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={handleBdComm} value ={props.bdCommVal} />
          </Form.Group>

          {/* <Button type="submit" variant="light" size="lg" block>Добавить</Button> */}
          <Button id="buttonAdd" type="submit" variant="success" size="lg" block className="main-form__button-add" >
            {/* Добавить */}
            {props.buttonAddName}
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
