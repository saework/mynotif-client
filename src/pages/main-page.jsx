import React from "react";
import { Container, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  push, go, goBack, goForward
} from "connected-react-router";
import axios from "axios";
import MainInfo from "../components/main-info";
import MainForm from "../components/main-form";
import "../style.scss";
import { store } from "../store/store";
import { loadBD } from "../actions/actions";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = { loading: false };
    this.myRef = React.createRef();
  }

  handlerLoading = () =>
    // eslint-disable-next-line react/destructuring-assignment
    (this.state.loading === true ? "Загрузка данных.." : "");

  // взаимодействие с сервером
  handlerSaveToServer = () => {
    const bdRows = store.getState().rootReducer;
    const currUserEmail = store.getState().rootReducer.currentUser;
    // console.log(store.getState().rootReducer)
    const data = {
      bdRows,
      currUserEmail,
    };
    // console.log(data);
    this.sendBDtoServer(data);
  };

  handlerLoadFromServer = () => {
    const currUserEmail = store.getState().rootReducer.currentUser;
    this.loadBDfromServer(currUserEmail);
  };

  // отправить данные в БД POST-запрос
  sendBDtoServer(data) {
    const url = "http://localhost:3000";
    // const url = "/";
    axios
      .post(url, {
        data,
      })
      .then((response) => {
        if (response.statusText === "OK") {
          const res = response.data;
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(`Ошибка соединения:${error}`);
      });
  }

  // получить данные из БД через GET-запрос
  loadBDfromServer(currUserEmail) {
    this.setState({ loading: true });
    const url = "http://localhost:3000/load";
    // const url = "/load?currUserEmail=" + currUserEmail;
    axios
      .get(url, {
        params: {
          currUserEmail,
        },
      })
      .then((response) => {
        // console.log(response)
        let bd;
        if (response.statusText === "OK") {
          const { data } = response;
          // console.log(data);
          const json = data[0].bdData;
          bd = JSON.parse(json);
        }
        return bd;
      })
      .then((bd) => {
        setTimeout(() => {
          console.log("ожидание..");
          store.dispatch(loadBD(bd));
          this.setState({ loading: false });
        }, 3000);
      })
      .catch((error) => {
        console.log(`Ошибка соединения:${error}`);
        this.setState({ loading: false });
      });
  }

  render() {
    const { bdRows } = this.props;
    return (
      <div>
        <Container>
          <MainInfo bdRows={bdRows} />
          <MainForm bdRows={bdRows} />
          <div>
            <Link to="/login">
              <button type="button">Войти</button>
            </Link>
            <Link to="/signup">
              <button type="button">Регистрация</button>
            </Link>
          </div>
          <Alert
            className="message__alert_center"
            variant="light"
            id="mainLabel"
          >
            {this.handlerLoading()}
          </Alert>
          <button type="button" onClick={this.handlerSaveToServer}>SaveToServer</button>
          <button type="button" onClick={this.handlerLoadFromServer}>LoadFromServer</button>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  store,
  bdRows: store.rootReducer.bdRows,
});
const mapDispatchToProps = (dispatch) => ({
  goTo: (payload) => {
    dispatch(push(payload.path));
  },
  goOne: (payload) => {
    dispatch(go(payload.num));
  },
  back: () => {
    dispatch(goBack());
  },
  forw: () => {
    dispatch(goForward());
  },
  // delBdRow: newbdRow=>dispatch(delBdRow(newbdRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
