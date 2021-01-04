// Prettier - CTRL + SHIFT + P - Format Document

import React from 'react';
import './style.scss';
//import { Route, Switch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
// import MainPage from './pages/main-page.tsx';
import MainPage from './pages/main-page';
import SignIn from './pages/sign-in.jsx';
import SignUp from './pages/sign-up.jsx';
import { history } from './store/store';

class App extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route history={history} path="/signup" component={SignUp} />
          <Route history={history} path="/login" component={SignIn} />
          <Route path="/" component={MainPage} />
        </Switch>
      </>
    );
  }
}
export default App;
