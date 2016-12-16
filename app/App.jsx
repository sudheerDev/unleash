import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { IntlProvider } from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './config/routes';
import configureStore from './store/configureStore';
import AuthService from './services/authService';

require('./styles/icons.css');
// Add fetch support for browsers without fetch
require('es6-promise').polyfill();
require('isomorphic-fetch');

injectTapEventPlugin();

const store = configureStore();

// Init Firebase and Google Auth
const authService = new AuthService(store.dispatch);
authService.init();

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <Router history={browserHistory}>
        {routes}
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('app'),
);
