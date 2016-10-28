import React, { Component } from 'react';
import GoalCard from './GoalCard';
import _ from 'lodash';

let styles = {};

class Goals extends Component {
  componentDidMount() {
    this.props.actions.fetchGoals();
  }

  renderGoals(goals) {
    return _.map(goals, (goal) =>
      <GoalCard key={goal.id} goal={goal} />
    );
  }

  render() {
    const { goals: { list } } = this.props;
    return (
      <div style={styles.goalsWrapper}>
        {this.renderGoals(list)}
      </div>
    );
  }
}

Goals.propTypes = {
  actions: React.PropTypes.object.isRequired,
  goals: React.PropTypes.object.isRequired,
};

styles = {
  goalsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 'auto',
    width: '90%',
    maxWidth: '1150px',
  },
};

export default Goals;
