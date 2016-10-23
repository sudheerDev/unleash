import React, { Component } from 'react';
import GoalCard from './GoalCard';
import PathHeader from './PathHeader';
import * as _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';

let styles = {};

class Paths extends Component {
  componentDidMount() {
    const { actions, params } = this.props;
    actions.pathsList(params.userId);
  }

  handleCreatePath() {
    const { actions, params } = this.props;
    actions.pathsCreate(params.userId);
  }

  renderGoals(goals) {
    return _.map(goals, (goal) =>
      <GoalCard key={goal.id} goal={goal} />
    );
  }

  renderPath(path) {
    const { actions } = this.props;
    return (
      <div key={path.id}>
        <PathHeader path={path} actions={actions} />
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
        <RaisedButton
          label="Create Path"
          backgroundColor="#8FD694"
          labelColor="#FFFFFF"
          onTouchTap={() => this.handleCreatePath()}
          style={styles.addPathButton}
        />
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
  addPathButton: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 'auto',
    width: '40%',
  }
};

export default Paths;
