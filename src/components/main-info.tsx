import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';
import moment from 'moment';
import { delBdRow, checkIdBdRow } from '../actions/actions';
import { getRowById } from '../functions';
import { IBdRow, IStore } from '../interfaces';

interface IProps {
  bdRows: IBdRow[];
  delBdRow: (bdRowId: number) => void;
  checkIdBdRow: (bdRowId: number) => void;
  setBdPeriodVal: (bdPeriodVal: string) => void;
  setButtonAddName: (buttonAddName: string) => void;
  setStartDate: (startDate: Date) => void;
  setPersNameVal: (persNameVal: string) => void;
  setBdCommVal: (bdCommVal: string) => void;
  setBdTmzVal: (bdTmzVal: string) => void;
  persNameRef: any;
}

function MainInfo(props: IProps) {
  const { bdRows } = props;

  const handleDelButtonClick = (bdRowId: number) => {
    props.delBdRow(bdRowId);
  };
  const handleEditButtonClick = (bdRowId: number) => {
    props.checkIdBdRow(bdRowId);
    const bdRow: IBdRow = getRowById(bdRowId);
    props.setButtonAddName('Сохранить изменения');
    props.persNameRef.current.focus();

    if (bdRow) {
      const { bdDate, persName, bdComm, bdTmz, bdPeriod } = bdRow;
      const bdDateStr: string = moment(bdDate, 'DD.MM.YYYY, H:mm').format('YYYY-MM-DD, H:mm');
      const bdDateVal: Date = new Date(bdDateStr);
      props.setPersNameVal(persName);
      props.setStartDate(bdDateVal);
      props.setBdCommVal(bdComm);
      props.setBdTmzVal(bdTmz);
      props.setBdPeriodVal(bdPeriod);
    }
  };

  return (
    <Row md={1} className="main-page__bd-info">
      <Col>
        <div className="main-info__page-capt">Сервис «Мои уведомления»</div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th className="main-info__th-num">№</th>
              <th className="main-info__th-name">Название</th>
              <th className="main-info__th-text">Подробности</th>
              <th className="main-info__th-date">Время</th>
              <th className="main-info__th-period">Период</th>
              <th className="main-info__th-edit"> </th>
              <th className="main-info__th-edit"> </th>
            </tr>
          </thead>

          <tbody>
            {bdRows.length > 0 && (
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
                        <button id="edit-button" type="button" className="manual__button" onClick={() => handleEditButtonClick(bdRow.id)} onKeyDown={() => handleEditButtonClick(bdRow.id)}>
                          <img className="main-info__edit" src="images/edit.svg" alt="edit" />
                        </button>
                      </div>
                    </td>
                    <td className="main-info__td-edit">
                      <div>
                        <button id="del-button" type="button" className="manual__button" onClick={() => handleDelButtonClick(bdRow.id)} onKeyDown={() => handleDelButtonClick(bdRow.id)}>
                          <img className="main-info__edit" src="images/trash.svg" alt="del" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
            {bdRows.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <div className="main-page__bd-nodata">Список пуст</div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

const mapStateToProps = (store: IStore) => ({
  bdRows: store.rootReducer.bdRows,
});
const mapDispatchToProps = (dispatch: any) => ({
  delBdRow: (bdRowId: number) => dispatch(delBdRow(bdRowId)),
  checkIdBdRow: (bdRowId: number) => dispatch(checkIdBdRow(bdRowId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainInfo);
