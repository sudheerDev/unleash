import React, { Component } from 'react';
import { LineChart, Line } from 'recharts';
import { yellow200, green600 } from 'material-ui/styles/colors';
import { pullAll, flatten } from 'lodash';

class Tempo extends Component {
  computeTempo(paths) {
    const tempo = [];

    let achievedGoals = flatten(paths.map(path => path.goals))
      .filter(path => path.achieved);

    const day = 1000 * 60 * 60 * 24;
    const week = day * 7;

    const now = new Date().valueOf();
    const startTime = now - (day * 365); // a year ago

    let currentTempo = 0;
    let currentAchievements;
    let hasPriorAchievement = false;

    for (let i = startTime; i < now; i += week) {
      currentAchievements = achievedGoals.filter((goal) => {
        // use dueDate for legacy records without achievedDate
        if ('achievedDate' in goal || 'dueDate' in goal) {
          const achievedDate = new Date(goal.achievedDate).valueOf() || new Date(goal.dueDate).valueOf();
          return achievedDate > i && achievedDate <= i + week;
        }
        return false;
      });

      // remove accounted achievements from achievements pool
      achievedGoals = pullAll(achievedGoals, currentAchievements);

      if (currentAchievements.length === 0 && !hasPriorAchievement) {
        currentTempo -= 1;
      } else {
        currentTempo += currentAchievements.length;
      }

      hasPriorAchievement = currentAchievements.length > 0;
      tempo.push({ tempo: currentTempo });
    }

    return tempo;
  }

  render() {
    const data = this.computeTempo(this.props.paths.list);

    return (
      <LineChart width={180} height={80} data={data}>
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={green600} />
            <stop offset="100%" stopColor={yellow200} />
          </linearGradient>
        </defs>
        <Line finalll="none" stroke="url(#gradient)" type="monotone" dot={false} dataKey="tempo" strokeWidth={3} />
      </LineChart>
    );
  }
}

Tempo.propTypes = {
  paths: React.PropTypes.shape({
    list: React.PropTypes.array.isRequired,
  }).isRequired,
};

export default Tempo;
