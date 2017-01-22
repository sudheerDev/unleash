import React, { PropTypes } from 'react';
import unleashLogo from '../assets/logo.png';
import Paper from 'material-ui/Paper';
import Loading from './Loading';

let styles = {};

const Login = ({ userLoginProcess, isLoading, authServiceInit }) => {
  const loginButton = (
    <button style={styles.buttonStyle} onClick={() => userLoginProcess()}>Login</button>
  );
  const message = isLoading ? 'Loading your superpowers' : 'Unleash your potential';
  const actionElement = isLoading ? <Loading style={styles.spinner} /> : loginButton;

  return (
    <div style={styles.principalContainerStyle}>
      <Paper zDepth={3} style={styles.paperStyle}>
        <img src={unleashLogo} style={styles.logoStyle} alt="Unleash Logo" />
        {authServiceInit && (
          <div style={styles.centerContainer}>
            <h1 style={styles.headerStyle}>{message}</h1>
            {actionElement}
          </div>
        )}
      </Paper>
    </div>
  );
};

Login.propTypes = {
  userLoginProcess: PropTypes.func,
  isLoading: PropTypes.bool,
  authServiceInit: PropTypes.bool,
};

styles = {
  principalContainerStyle: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '40px',
    justifyContent: 'center',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  spinner: {
    marginTop: 0,
  },
  paperStyle: {
    padding: '30px',
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  headerStyle: {
    fontFamily: 'Inconsolata',
    color: '#f54e45',
  },
  logoStyle: {
    width: '200px'
  },
  buttonStyle: {
    background: '#d14836',
    color: '#fff',
    width: 190,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 2,
    border: '1px solid transparent',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inconsolata',
    cursor: 'pointer'
  },
};

export default Login;
