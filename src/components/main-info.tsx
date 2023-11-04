import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { Row, Col, Table, Button } from 'react-bootstrap';
import moment from 'moment';
import { delBdRow, checkIdBdRow, resetStore } from '../actions/actions';
import { getRowById } from '../functions';
import { IBdRow, IStore } from '../interfaces';
import TableSearch from './table-search';
import DeleteModal from './delete-modal';
import { history } from '../store/store';
import config from '../configs/config';

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
  handlerSaveToServer: any;
  resetStore: () => void;
  setFormVisible: (formVisible: boolean) => void;
}

function MainInfo(props: IProps) {
  const { bdRows } = props;
  const pageSize = config.PAGINATION_ROW_COUNT;
  const [needSave, setNeedSave] = useState<boolean>(false);
  const [dataBdRows, setDataBdRows] = useState<IBdRow[]>(bdRows);
  const [filteredData, setFilteredData] = useState<IBdRow[]>(bdRows);
  const [displayData, setDisplayData] = useState<IBdRow[]>(bdRows);
  const [sort, setSort] = useState<any>('asc');
  const [search, setSearch] = useState<any>('');
  const [sortRowNum, setSortRowNum] = useState<string>('\u2193');
  const [sortRowName, setSortRowName] = useState<string>('');
  const [sortRowComm, setSortRowComm] = useState<any>('');
  const [sortRowDate, setSortRowDate] = useState<any>('');
  const [sortRowPeriod, setSortRowPeriod] = useState<any>('');
  const [pageCount, setPageCount] = useState(Math.ceil(bdRows.length / pageSize));
  const [currentPage, setCurrentPage] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [delRowId, setDelRowId] = useState(0);

  const getFilteredData = () => {
    if (!search) {
      return dataBdRows;
    }
    return dataBdRows.filter(
      (item) =>
        item.persName.toLowerCase().includes(search.toLowerCase())
        || item.bdComm.toLowerCase().includes(search.toLowerCase())
        || item.bdDate.toLowerCase().includes(search.toLowerCase())
        || item.bdPeriod.toLowerCase().includes(search.toLowerCase())
    );
  };

  const getPageCount = () => {
    if (!search) {
      return Math.ceil(bdRows.length / pageSize);
    }
    return Math.ceil(filteredData.length / pageSize);
  };

  const getDisplayData = (currPage: number) => {
    if (filteredData && filteredData.length > 0) {
      return _.chunk(filteredData, pageSize)[currPage];
    }
    return [];
  };

  const sortBDRowsByData = (dataRows: IBdRow[], sortField: string, sortType: any) => {
    const rowsAfterFormat = dataRows.map((bdRow) => {
      const bdDate = bdRow.bdDate.replace(/(\d+).(\d+).(\d+)/, '$3.$2.$1');
      return {
        ...bdRow,
        bdDate,
      };
    });

    const sortRowsAfterFormat = _.orderBy(rowsAfterFormat, sortField, sortType);
    const resultRows = sortRowsAfterFormat.map((bdRow) => {
      const bdDate = bdRow.bdDate.replace(/(\d+).(\d+).(\d+)/, '$3.$2.$1');
      return {
        ...bdRow,
        bdDate,
      };
    });
    return resultRows;
  };

  useEffect(() => {
    if (needSave) {
      props.handlerSaveToServer();
      setNeedSave(false);
    }
  });
  useEffect(() => {
    setDataBdRows(bdRows);
  }, [bdRows]);

  useEffect(() => {
    setFilteredData(getFilteredData());
  }, [search]);

  useEffect(() => {
    setFilteredData(getFilteredData());
  }, [currentPage]);

  useEffect(() => {
    setFilteredData(getFilteredData());
  }, [dataBdRows]);

  useEffect(() => {
    setPageCount(getPageCount());
    setDisplayData(getDisplayData(currentPage));
  }, [filteredData]);

  const handleSortClick = (sortField: string) => {
    const sortType = sort === 'asc' ? 'desc' : 'asc';

    let orderedBdRows = dataBdRows;
    if (sortField !== 'bdDate') {
      orderedBdRows = _.orderBy(dataBdRows, sortField, sortType);
    } else {
      orderedBdRows = sortBDRowsByData(dataBdRows, sortField, sortType);
    }
    setDataBdRows(orderedBdRows);
    setSort(sortType);

    if (sortField === 'persName') {
      if (sortType === 'asc') {
        setSortRowName('\u2193');
        setSortRowComm('');
        setSortRowDate('');
        setSortRowPeriod('');
        setSortRowNum('');
      } else {
        setSortRowName('\u2191');
        setSortRowComm('');
        setSortRowDate('');
        setSortRowPeriod('');
        setSortRowNum('');
      }
    }
    if (sortField === 'bdComm') {
      if (sortType === 'asc') {
        setSortRowName('');
        setSortRowComm('\u2193');
        setSortRowDate('');
        setSortRowPeriod('');
        setSortRowNum('');
      } else {
        setSortRowName('');
        setSortRowComm('\u2191');
        setSortRowDate('');
        setSortRowPeriod('');
        setSortRowNum('');
      }
    }
    if (sortField === 'bdDate') {
      if (sortType === 'asc') {
        setSortRowName('');
        setSortRowComm('');
        setSortRowDate('\u2193');
        setSortRowPeriod('');
        setSortRowNum('');
      } else {
        setSortRowName('');
        setSortRowComm('');
        setSortRowDate('\u2191');
        setSortRowPeriod('');
        setSortRowNum('');
      }
    }
    if (sortField === 'bdPeriod') {
      if (sortType === 'asc') {
        setSortRowName('');
        setSortRowComm('');
        setSortRowDate('');
        setSortRowPeriod('\u2193');
        setSortRowNum('');
      } else {
        setSortRowName('');
        setSortRowComm('');
        setSortRowDate('');
        setSortRowPeriod('\u2191');
        setSortRowNum('');
      }
    }
    if (sortField === 'id') {
      if (sortType === 'asc') {
        setSortRowName('');
        setSortRowComm('');
        setSortRowDate('');
        setSortRowPeriod('');
        setSortRowNum('\u2193');
      } else {
        setSortRowName('');
        setSortRowComm('');
        setSortRowDate('');
        setSortRowPeriod('');
        setSortRowNum('\u2191');
      }
    }
  };

  const pageChangeHandler = ({ selected }: any) => {
    setCurrentPage(selected);
    setDisplayData(getDisplayData(selected));
  };

  const searchHandler = (searchText: string) => {
    setSearch(searchText);
    setCurrentPage(0);
  };

  const handleExitButtonClick = () => {
    localStorage.removeItem('loginData');
    history.push({
      pathname: '/login',
    });
    props.resetStore();
  };

  const handleDelButtonClick = (bdRowId: number) => {
    setDelRowId(bdRowId);
    setModalShow(true);
  };
  const handleDeleteRow = () => {
    if (delRowId !== 0) {
      props.delBdRow(delRowId);
      setNeedSave(true);
      setDelRowId(0);
      setModalShow(false);
    }
  };

  const handleEditButtonClick = (bdRowId: number) => {
    props.checkIdBdRow(bdRowId);
    const bdRow: IBdRow = getRowById(bdRowId);
    props.setButtonAddName('Сохранить изменения');
    props.setFormVisible(true);
    if (props.persNameRef.current !== null) {
      props.persNameRef.current.focus();
    }
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
        <div className="main-info__capt-container">
          <div className="main-info__page-capt">Мои уведомления</div>
          <div>
            <Button
              id="buttonExit"
              type="button"
              variant="danger"
              block
              onClick={handleExitButtonClick}
              className="exit__button"
            >
              Выйти
            </Button>
          </div>
        </div>
        <DeleteModal
          modalShow={modalShow}
          handleCloseModal={() => setModalShow(false)}
          handleDeleteRow={handleDeleteRow}
        />
        <TableSearch onSearch={searchHandler} />
        <Table responsive="sm">
          <thead>
            <tr>
              <th className="main-info__th-num" onClick={() => handleSortClick('id')}>
                №
                {' '}
                {sortRowNum}
              </th>
              <th className="main-info__th-name" onClick={() => handleSortClick('persName')}>
                Название
                {' '}
                {sortRowName}
              </th>
              <th className="main-info__th-text" onClick={() => handleSortClick('bdComm')}>
                Подробности
                {' '}
                {sortRowComm}
              </th>
              <th className="main-info__th-date" onClick={() => handleSortClick('bdDate')}>
                Время
                {' '}
                {sortRowDate}
              </th>
              <th className="main-info__th-period" onClick={() => handleSortClick('bdPeriod')}>
                Период
                {' '}
                {sortRowPeriod}
              </th>
              <th className="main-info__th-edit"> </th>
              <th className="main-info__th-edit"> </th>
            </tr>
          </thead>

          <tbody>
            {bdRows.length > 0 && (
              <>
                {displayData.map((bdRow, index) => (
                  <tr key={bdRow.id}>
                    {sort !== 'asc' && sortRowNum !== '' ? <td>{bdRows.length - (index + currentPage * pageSize)}</td> : <td>{index + 1 + currentPage * pageSize}</td>}
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
        {bdRows.length > pageSize && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={pageChangeHandler}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<"
            containerClassName="pagination"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            forcePage={currentPage}
          />
        )}
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
  resetStore: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainInfo);
