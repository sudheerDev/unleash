import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

let styles = {};

const Loading = ({ style, children, loading }) => {
  if (loading) {
    return (
      <div style={style || styles.loading}>
        <CircularProgress color="#E57373" />
      </div>
    );
  }
  return children;
};

styles = {
  loading: {
    textAlign: 'center',
    marginTop: '60px',
  }
};

Loading.propTypes = {
  style: React.PropTypes.object,
  children: PropTypes.node,
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  loading: true,
};

export default Loading;
