import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { red300 } from 'material-ui/styles/colors';
import Login from './Login';
import LoggedWrapper from './LoggedWrapper';
import NotificationBar from './NotificationBar';

const muiTheme = getMuiTheme({
  appBar: {
    color: red300,
  },
});

const UnleashApp = ({ isLoggedIn, userLoginProcess, children, isLoading, notifications,
  authServiceInit, removeNotification }) => {
  const loggedContainer = <LoggedWrapper>{children}</LoggedWrapper>;
  const loginContainer = (
    <Login
      userLoginProcess={userLoginProcess}
      isLoading={isLoading}
      authServiceInit={authServiceInit}
    />
  );
  const container = isLoggedIn ? loggedContainer : loginContainer;

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        {container}
        <NotificationBar notifications={notifications} removeNotification={removeNotification} />
      </div>
    </MuiThemeProvider>
  );
};

UnleashApp.propTypes = {
  isLoggedIn: PropTypes.bool,
  userLoginProcess: PropTypes.func,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  notifications: PropTypes.arrayOf(PropTypes.object),
  authServiceInit: PropTypes.bool,
  removeNotification: PropTypes.func,
};

export default UnleashApp;
