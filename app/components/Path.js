import React, { Component } from 'react';
import GoalCard from './GoalCard';
import * as _ from 'lodash';

let styles = {};

class Paths extends Component {
  componentDidMount() {
    const { actions, params } = this.props;
    actions.pathsList(params.userId);
  }

  renderGoals(goals) {
    return _.map(goals, (goal) =>
      <GoalCard key={goal.id} goal={goal} />
    );
  }

  renderPath(path) {
    return (
      <div key={path.id}>
        <div className="pathHeader" style={styles.pathHeader}>
          <div style={styles.divider}></div>
          <div><i className="icon-map" /> {path.name || 'Main Path'}</div>
          <div style={styles.divider}></div>
        </div>
        <div style={styles.pathsWrapper}>
          {this.renderGoals(path.goals)}
        </div>
      </div>
    );
  }

  render() {
    const { paths } = this.props;
    return (
      <div>
        {_.map(paths, (path) => this.renderPath(path))}
      </div>
    );
  }
}

Paths.propTypes = {
  actions: React.PropTypes.object.isRequired,
  paths: React.PropTypes.array.isRequired,
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
};

styles = {
  pathsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 'auto',
    width: '90%',
    maxWidth: '1150px',
  },
  pathHeader: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    maxWidth: '1150px',
    margin: '40px auto 0',
    padding: '0 40px',
    textAlign: 'center',
    fontFamily: 'Inconsolata, cursive',
    fontWeight: 'lighter',
    fontSize: '26px',
    textTransform: 'capitalize',
    color: '#969696',
  },
  divider: {
    flexGrow: 1,
    backgroundColor: '#ebebeb',
    height: '1px',
    alignSelf: 'center',
    margin: '0 20px',
  },
};

export default Paths;
