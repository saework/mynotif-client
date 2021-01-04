// import React, {useState} from "react";
// import {Row, Col, Form, Button } from 'react-bootstrap';
// import $ from 'jquery';
// import { connect } from "react-redux";
import _ from 'lodash';
import { store } from './store/store';

// function Functions() {

export function getCurrentId() {
  const { currentId } = store.getState().rootReducer;
  return currentId;
}
export function getRowById(bdRowId) {
  const { bdRows } = store.getState().rootReducer;
  // const bdRow = bdRows.filter(item=>item.id === bdRowId)[0] ;  //классический способ
  const bdRow = _.find(bdRows, { id: bdRowId }); // через lodash
  return bdRow;
}
// }

// const mapStateToProps = (store) => ({
//     bdRows:store.bdRows,
//   });
//   const mapDispatchToProps = (dispatch) => ({
//   });

//   export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   )(Functions);
