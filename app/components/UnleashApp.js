import React, { PropTypes } from 'react';
import Login from './Login';
import LoggedWrapper from './LoggedWrapper';
import ReduxToastr from 'react-redux-toastr';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { red300 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  appBar: {
    color: red300,
  },
});

const UnleashApp = ({ isLoggedIn, userLoginProcess, children, isLoading, authServiceInit }) => {
  const loggedContainer = <LoggedWrapper children={children} />;
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
        <ReduxToastr
          timeOut={5000}
          newestOnTop={false}
          position="top-right"
        />
      </div>
    </MuiThemeProvider>
  );
};

UnleashApp.propTypes = {
  isLoggedIn: PropTypes.bool,
  userLoginProcess: PropTypes.func,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  authServiceInit: PropTypes.bool,
};

export default UnleashApp;
