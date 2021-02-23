import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import NewPass from './pages/new-pass';
import { history } from './store/store';
import { IStore } from './interfaces';

interface IProps {
  currentUser: string;
  jwtToken: {};
}
type IState = { loggedIn: boolean };

class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { loggedIn: false };
  }

  componentDidMount() {
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
