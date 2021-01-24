import React from "react";
import { connect } from "react-redux";
import $ from "jquery";
import {
  Row, Col, Table, Button
} from "react-bootstrap";
import moment from "moment";
import { delBdRow, checkIdBdRow } from "../actions/actions";
import { getRowById } from "../functions";

function MainInfo(props) {
  // console.log(props)
  const { bdRows } = props;

  const handleDelButtonClick = (bdRowId) => {
    // console.log(bdRowId);
    props.delBdRow(bdRowId);
  };
  const handleEditButtonClick = (bdRowId) => {
    // console.log(bdRowId);
    props.checkIdBdRow(bdRowId);
    const bdRow = getRowById(bdRowId);
    // console.log(bdRow);
    $("#buttonAdd").html("Редактировать");

    //$('#persName').focus;
    document.getElementById("persName").focus();
    //getElementById("mytext").focus();

    if (bdRow) {
      //const bdDate = moment(bdRow.bdDate).format("YYYY-MM-DD");
      const bdDate = bdRow.bdDate;
      $("#persName").val(bdRow.persName);
      $("#bdDate").val(bdDate);
      $("#bdComm").val(bdRow.bdComm);
      $("#bdTmz").val(bdRow.bdTmz);
      $("#bdPeriod").val(bdRow.bdPeriod);
    }
  };

  return (
    <Row md className="main-page__bd-info">
      <Col>
        <Table>
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
              <th>Подробности</th>
              <th>Дата, время</th>
              <th>Период</th>
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
                <td>
                  <div>
                    <Button
                      variant="light"
                      onClick={() => handleEditButtonClick(bdRow.id)}
                    >
                      Р
                    </Button>
                  </div>
                </td>
                <td>
                  <div>
                    <Button
                      variant="light"
                      onClick={() => handleDelButtonClick(bdRow.id)}
                    >
                      У
                    </Button>
                  </div>
                </td>
              </tr>
            )
            )}

            </>}
            {bdRows.length == 0 && 
            <tr>
                <td></td>
                <td></td>
                <td>
                <div className="main-page__bd-nodata">
                  Список пуст
                </div>
                </td>
                <td></td>
                <td></td>
            </tr>}

          </tbody>

        </Table>
      </Col>
    </Row>
  );
}

const mapStateToProps = (store) => ({
  // bdRows:store.bdRows,
});
const mapDispatchToProps = (dispatch) => ({
  delBdRow: (newbdRow) => dispatch(delBdRow(newbdRow)),
  checkIdBdRow: (newbdRow) => dispatch(checkIdBdRow(newbdRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainInfo);
