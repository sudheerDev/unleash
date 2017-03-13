import React, { PropTypes } from 'react';
import get from 'lodash/get';
import { red700, green700 } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

let styles = {};

const NotificationBar = ({ notifications, removeNotification }) => {
  const openSnackbar = !!notifications && !!notifications[0];
  const msg = get(notifications, '[0].message', '');
  const type = get(notifications, '[0].type', 'error');

  return (
    <Snackbar
      open={openSnackbar}
      message={msg}
      autoHideDuration={3000}
      onRequestClose={removeNotification}
      bodyStyle={styles[type]}
    />
  );
};

NotificationBar.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  removeNotification: PropTypes.func,
};

styles = {
  success: {
    backgroundColor: green700,
  },
  error: {
    backgroundColor: red700,
  },
};

export default NotificationBar;
