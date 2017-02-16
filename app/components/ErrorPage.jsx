import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { red300 } from 'material-ui/styles/colors';
import { Card, CardTitle, CardActions, FlatButton } from 'material-ui';
import { getErrorCode, getErrorMsg } from '../constants/errors';

const muiTheme = getMuiTheme({
  appBar: {
    color: red300,
  },
});

const style = {
  card: {
    width: '50%',
    margin: 'auto',
  },
};

const ErrorPage = ({ params }) => {
  const { code } = params;
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Card style={style.card}>
        <CardTitle
          title={getErrorCode(code)}
          subtitle={getErrorMsg(code)}
        />
        <CardActions>
          <FlatButton label="HOME" href="/" />
        </CardActions>
      </Card>
    </MuiThemeProvider>
  );
};


ErrorPage.propTypes = {
  params: PropTypes.shape({
    code: PropTypes.string,
  }),
};

export default ErrorPage;
