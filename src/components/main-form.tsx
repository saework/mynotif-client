import React, { useState } from "react";
import {
  Row, Col, Form, Button
} from "react-bootstrap";
import $ from "jquery";
import { connect } from "react-redux";
// import Functions from "../functions";
import moment from "moment";
import { getCurrentId } from "../functions";
import { addBdRow, editBdRow } from "../actions/actions";
import { IAction, IRootReducer, IBdRows, IBdRow, IStore } from "../interfaces";
// import { store } from "../store/store";
// import { extendWith } from "lodash";

interface IProps {
  addBdRow: (newbdRow: IBdRow) => void;
  checkedId: number;
  editBdRow: (newbdRow: IBdRow) => void;
}

function MainForm(props: IProps) {
  // const bdRows = props.bdRows;
  const [validated, setValidated] = useState(false);

  const handleAddButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      const buttonAdd = $("#buttonAdd").html();
      const persNameVal:string= $("#persName").val() as string;
      const bdDateVal:string = $("#bdDate").val() as string;
      const bdCommVal:string = $("#bdComm").val() as string;

      if (buttonAdd === "Добавить") {
        const newbdRow: IBdRow = {
          id: getCurrentId() + 1,
          persName: persNameVal,
          bdDate: bdDateVal,
          bdComm: bdCommVal,
        };
        props.addBdRow(newbdRow);
      }
      if (buttonAdd === "Редактировать") {
        const bdDate = moment(bdDateVal).format("DD.MM.YYYY");
        const newbdRow = {
          id: props.checkedId,
          persName: persNameVal,
          bdDate,
          bdComm: bdCommVal,
        };
        // console.log(newbdRow);
        props.editBdRow(newbdRow);
        $("#buttonAdd").html("Добавить");
        // очищаем поля
        $("#persName").val("");
        $("#bdDate").val("");
        $("#bdComm").val("");
      }
    }
  };
  return (
    <Row md={1} className="main-page__bd-form">
      <Col>
        <Form noValidate validated={validated} onSubmit={handleAddButtonClick}>
          <Form.Row>
            <Form.Group as={Col} controlId="persName">
              <Form.Label>Имя</Form.Label>
              <Form.Control required type="text" placeholder="ФИО" />
              <Form.Control.Feedback type="invalid">
                Заполните поле
              </Form.Control.Feedback>
              <Form.Text className="text-muted">Кого поздравить</Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="bdDate">
              <Form.Label>Дата</Form.Label>
              <Form.Control required type="date" placeholder="01.02.1989" />
              <Form.Control.Feedback type="invalid">
                Заполните поле
              </Form.Control.Feedback>
              <Form.Text className="text-muted">Дата рождения</Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="bdComm">
            <Form.Label>Комментарий</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          {/* <Button type="submit" variant="success" size="lg" block>Добавить</Button> */}
          <Button id="buttonAdd" type="submit" variant="light" size="lg" block>
            Добавить
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
