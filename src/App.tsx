// Prettier - CTRL + SHIFT + P - Format Document

import React from "react";
import "./style.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./pages/main-page";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import NewPass from "./pages/new-password";
import { history, store } from "./store/store";
import _ from "lodash";

import axios from "axios";

type IProps = any
type IState = { loggedIn: boolean };
class App extends React.PureComponent<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {loggedIn: false}
  }
  componentDidMount(){
    const currentUser = store.getState().rootReducer.currentUser;
    const jwtToken = store.getState().rootReducer.jwtToken;
    if (currentUser && !_.isEmpty(jwtToken)){
      this.setState({loggedIn: true});
    }else{
      this.setState({loggedIn: false});
    }
  }

// getStartAuth = (currUserEmail:string) => {
//   const url = "/";
//   // const url = "/load?currUserEmail=" + currUserEmail;
//   axios
//     .get(url, {
//       params: {
//         currUserEmail,
//       },
//     })
//     .then((response) => {
//       // console.log(response)
//       if (response.statusText === "OK") {
//         console.log("!!!")
//       }
//     })
//     .catch((error) => {
//       console.log(`Ошибка запуска приложения:${error}`);
//     });
// }

  render() {
    return (
      <>
        <Switch>
          <Route history={history} path="/signup" component={SignUp} />
          <Route history={history} path="/login" component={SignIn} />
          <Route history={history} path="/newpassword" component={NewPass} />
          <Route history={history} path="/home" component={MainPage} />
          {/* <Route exact path="/" render={() => (<Redirect to="/home" />)} />  */}
          {/* <Route path="/" component={MainPage} /> */}
          {/* <Route path="/"  /> */}
          {/* <Route exact path="/" render={() => {
                 this.getStartAuth("");
                 return <MainPage />;
            }
          }/>  */}
           {/* <Route exact path="/" render={() => (<Redirect to="/home" />)} onChange={this.getStartAuth("")} />  */}
           <Route exact path="/">
            {this.state.loggedIn ? <Redirect to="/home" /> : <SignIn />}
          </Route>
        </Switch>
      </>
    );
  }
}
export default App;
