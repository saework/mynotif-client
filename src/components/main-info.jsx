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
    if (bdRow) {
      const bdDate = moment(bdRow.bdDate).format("YYYY-MM-DD");
      $("#persName").val(bdRow.persName);
      $("#bdDate").val(bdDate);
      $("#bdComm").val(bdRow.bdComm);
    }
  };

  return (
    <Row md className="main-page__bd-info">
      <Col>
        <Table>
          <thead>
            <tr>
              <th>№</th>
              <th>ФИО</th>
              <th>Дата</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {bdRows.map((bdRow, index) => (
              <tr key={bdRow.id}>
                <td>{index + 1}</td>
                <td>{bdRow.persName}</td>
                <td>{bdRow.bdDate}</td>
                <td>{bdRow.bdComm}</td>
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
            ))}
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
