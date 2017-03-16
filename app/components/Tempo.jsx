import React, { PropTypes } from 'react';
import { LineChart, Line } from 'recharts';
import { yellow200, green600 } from 'material-ui/styles/colors';
import tempoHelper from '../helpers/tempoHelper';

const Tempo = ({ paths }) => (
  <LineChart width={180} height={80} data={tempoHelper.getTempoHistory(paths)}>
    <defs>
      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={green600} />
        <stop offset="100%" stopColor={yellow200} />
      </linearGradient>
    </defs>
    <Line finalll="none" stroke="url(#gradient)" type="monotone" dot={false} dataKey="tempo" strokeWidth={3} />
  </LineChart>
);

Tempo.propTypes = {
  paths: PropTypes.shape({
    list: PropTypes.array.isRequired,
  }).isRequired,
};

export default Tempo;
