import React, { PropTypes } from 'react';
import Menu from '../containers/Menu';

let styles = {};

const LoggedWrapper = ({ children }) => (
  <div>
    <Menu />
    <div style={styles.wrapper}>
      {children}
    </div>
  </div>
);

LoggedWrapper.propTypes = {
  children: PropTypes.node,
};

styles = {
  wrapper: {
    padding: '0 0 0 250px',
  },
};

export default LoggedWrapper;
