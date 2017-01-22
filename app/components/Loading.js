import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

let styles = {};

const Loading = ({ style }) => (
  <div style={style || styles.loading}>
    <CircularProgress color="#E57373" />
  </div>
);

Loading.propTypes = {
  style: React.PropTypes.object,
};

styles = {
  loading: {
    textAlign: 'center',
    marginTop: '60px',
  }
};

export default Loading;
