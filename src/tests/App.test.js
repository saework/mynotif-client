import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import renderer from 'react-test-renderer';
import config from '../configs/config';
import MainInfo from '../components/main-info';
import MainForm from '../components/main-form';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';
import NewPass from '../pages/new-pass';
import { store, history } from '../store/store';

const { TIMEZONE, DEFAULTPERIOD } = config;

describe('Snapshot tests', () => {
 
    it('MainInfo', () => {
      const tree = renderer
        .create(
           <Provider store={store}>
            <MainInfo
              buttonAddNam='Добавить'
              bdPeriodVal={DEFAULTPERIOD}
              startDate={new Date('2020-12-17T03:24:00')}
              persNameVal=''
              bdCommVal={TIMEZONE}
              persNameRef={null}
            />
           </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    
    it('MainForm', () => {
      const tree = renderer
        .create(
           <Provider store={store}>
            <MainForm
              buttonAddNam='Добавить'
              bdPeriodVal={DEFAULTPERIOD}
              startDate={new Date('2020-12-17T03:24:00')}
              persNameVal=''
              bdCommVal={TIMEZONE}
              persNameRef={null}
            />
           </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('SignIn', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <SignIn/>
            </ConnectedRouter>
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('SignUp', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <SignUp/>
            </ConnectedRouter>
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('NewPass', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <NewPass/>
            </ConnectedRouter>
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
});
