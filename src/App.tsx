import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
/** Лучше не использовать _, а импортировать конкретные функции из лодаша
 * В текущем варианте у тебя при сборке проекта сюда будет включен весь лодаш целиком
 * А если импортишь конкретную функцию, то при сборке будет включен только код этой функции.
 * В целом я не разделяю любви к лодашу (но это дело вкуса).
 * Он очень редко когда реально нужен и всегда можно написать свои аналоги-утилитки
 * Удобен разве что на больших проектах.
 */
import _ from 'lodash';
import { connect } from 'react-redux';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import NewPass from './pages/new-pass';
import { history } from './store/store';
import { IStore } from './interfaces';

/** Я предпочитаю выносить интерфейсы за пределы react-компонент.
 * Обычно кладу в папку с компонентой в interfaces.ts
 * Тут дело вкуса, но очень часто интерфейсы разрастаются и мешают при работе с компонентой
 */
interface IProps {
  currentUser: string;
  jwtToken: {};
}
type IState = { loggedIn: boolean };

/** В данном случае использование классового компонента не оправданно
 * Сейчас предпочтение отдают функциональным с хуками. Классы - это легаси.
 * Или какие-то блоки функциональности, которые хорошо ложатся на ООП.
 * componentDidMount можно заменить на useEffect или useLayoutEffect (смотри что тебе здесь нужно).
 * У redux так же есть хуки для работы со стейтом.
 * Однако у классовых компонент есть одно преимущество - ЖЦ который отвечает за отлов ошибок рендера
 * Обычно в проектах делаю такую компоненту-обертку на верхнем уровне приложения.
 * Посмотри про componentDidCatch и getDerivedStateFromError
 */
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
          {/* Все path в enum */}
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
