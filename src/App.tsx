// Prettier - CTRL + SHIFT + P - Format Document

import React from 'react';
import './style.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
// import MainPage from "./pages/home";
import _ from 'lodash';
import { connect } from 'react-redux';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import NewPass from './pages/new-pass';
import { history } from './store/store';
import { IStore } from './interfaces';
// import consoleLog from "./configs/console-log";

type IProps = any;
type IState = { loggedIn: boolean };
class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { loggedIn: false };
  }

  componentDidMount() {
    // const currentUser = store.getState().rootReducer.currentUser;
    // const jwtToken = store.getState().rootReducer.jwtToken;
    // const currentUser = this.props.currentUser;
    // const jwtToken = this.props.jwtToken;
    console.log('!!!'); // !!!
    const { currentUser, jwtToken } = this.props;
    if (currentUser && !_.isEmpty(jwtToken)) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <>
        <Switch>
          <Route history={history} path="/signup" component={SignUp} />
          <Route history={history} path="/login" component={SignIn} />
          <Route history={history} path="/newpassword" component={NewPass} />
          <Route history={history} path="/home" component={Home} />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/home" /> : <SignIn />}
          </Route>
        </Switch>
      </>
    );
  }
}
const mapStateToProps = (store: IStore) => ({
  currentUser: store.rootReducer.currentUser,
  jwtToken: store.rootReducer.jwtToken,
});
export default connect(mapStateToProps)(App);
