import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import {
  Row, Col, Table, Button
} from "react-bootstrap";
import moment from "moment";
import momenttz from "moment-timezone";
import DatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { delBdRow, checkIdBdRow } from "../actions/actions";
import { getRowById } from "../functions";
import { store, history } from "../store/store";

function MainInfo(props) {
  // console.log(props)
  const { bdRows } = props;
  //const bdRows = store.getState().rootReducer.bdRows;

  const handleDelButtonClick = (bdRowId) => {
    // console.log(bdRowId);
    props.delBdRow(bdRowId);
  };
  const handleEditButtonClick = (bdRowId) => {
    // console.log(bdRowId);
    props.checkIdBdRow(bdRowId);
    const bdRow = getRowById(bdRowId);
    // console.log(bdRow);
    //$("#buttonAdd").html("Редактировать");
    props.setButtonAddName("Сохранить изменения");
    //$('#persName').focus;
    //document.getElementById("persName").focus();
    props.persNameRef.current.focus();
    //getElementById("mytext").focus();

    if (bdRow) {
      //const bdDateSr = moment(bdRow.bdDate).format("YYYY-MM-DD");
      const bdDateStr = moment(bdRow.bdDate,'DD.MM.YYYY, H:mm').format('YYYY-MM-DD, H:mm');
      //const bdDate = moment(props.startDate).format('DD.MM.YYYY, H:mm');
      //const bdDate =  moment(bdDateSr).toDate();

      //const bdDate =  moment(bdRow.bdDate).toDate();  ///!!!
      const bdDate = new Date(bdDateStr);
      //const bdDate = setHours(setMinutes(bdDateF, 0), 9)
      //const bdDate = bdRow.bdDate
      console.log(bdDate)
      //const bdDate = moment(props.startDate).format('dd.mm.yyyy, HH:mm').toDate();
      //console.log(bdRow)
      //$("#persName").val(bdRow.persName);
      props.setPersNameVal(bdRow.persName);
      //$("#bdDate").val(bdRow.bdDate);  
      //$("#bdDateTime").val(bdRow.bdDate); 
      props.setStartDate(bdDate);
      //$("#bdComm").val(bdRow.bdComm);
      props.setBdCommVal(bdRow.bdComm);
      //$("#bdTmz").val(bdRow.bdTmz);
      props.setBdTmzVal(bdRow.bdTmz);
      //$("#bdPeriod").val(bdRow.bdPeriod);
      props.setBdPeriodVal(bdRow.bdPeriod);

      // bdPeriodVal={bdPeriodVal} setBdPeriodVal={setBdPeriodVal}
      // buttonAddName={buttonAddName} setButtonAddName={setButtonAddName}
      // startDate={startDate} setStartDate={setStartDate}
      // persNameVal={persNameVal} setPersNameVal={setPersNameVal}
      // bdCommVal={bdCommVal} setBdCommVal={setBdCommVal}
      // bdTmzVal={bdTmzVal} setBdTmzVal={setBdTmzVal}
    }
  };

  return (
    <Row md className="main-page__bd-info">
      <Col>
      <div className="main-info__page-capt">Сервис «Мои уведомления»</div>
        <Table responsive="sm">
          <thead>
            <tr>
              {/* <th sm={2} className="main-info__th-num">№</th> */}
              <th className="main-info__th-num">№</th>
              <th className="main-info__th-name">Название</th>
              {/* <th sm={8} className="main-info__th-text">Подробности</th> */}
              <th className="main-info__th-text">Подробности</th>
              <th className="main-info__th-date">Время</th>
              <th className="main-info__th-period">Период</th>
              <th className="main-info__th-edit"></th>
              <th className="main-info__th-edit"></th>
            </tr>
          </thead>

          <tbody>
          {bdRows.length > 0 &&
          <>
            {bdRows.map((bdRow, index) => (
              <tr key={bdRow.id}>
                <td>{index + 1}</td>
                <td>{bdRow.persName}</td>
                <td>{bdRow.bdComm}</td>
                <td>{bdRow.bdDate}</td>
                <td>{bdRow.bdPeriod}</td>
                <td className="main-info__td-edit">
                  <div>
                    {/* <Button
                      variant="light"
                      onClick={() => handleEditButtonClick(bdRow.id)}>
                      Р
                    </Button> */}
                    <img className="main-info__edit" src="images/edit.svg" onClick={() => handleEditButtonClick(bdRow.id)}></img>
                  </div>
                </td>
                <td className="main-info__td-edit">
                  <div>
                    {/* <Button
                      variant="light"
                      onClick={() => handleDelButtonClick(bdRow.id)}>
                      У
                    </Button> */}
                    <img className="main-info__edit" src="images/trash.svg" onClick={() => handleDelButtonClick(bdRow.id)}></img>
                  </div>
                </td>
              </tr>
            )
            )}

            </>}
            {bdRows.length == 0 && 
            <tr>
                <td colSpan="7">
                <div className="main-page__bd-nodata">
                  Список пуст
                </div>
                </td>
            </tr>}

          </tbody>

        </Table>
      </Col>
    </Row>
  );
}

const mapStateToProps = (store) => ({
//   bdRows:store.bdRows,
});
const mapDispatchToProps = (dispatch) => ({
  delBdRow: (newbdRow) => dispatch(delBdRow(newbdRow)),
  checkIdBdRow: (newbdRow) => dispatch(checkIdBdRow(newbdRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainInfo);
