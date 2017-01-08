import React, { Component } from 'react';
import { map, some } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import GoalCard from './GoalCard';
import PathHeader from './PathHeader';
import Loading from './Loading';

let styles = {};

class Paths extends Component {

  componentDidMount() {
  }

  handleCreatePath() {
    const { actions, userId } = this.props;
    actions.pathsCreate(userId);
  }

  renderGoals(path) {
    const { actions, paths } = this.props;
    return map(path.goals, (goal) => {
      const loading = some(paths.goals, { id: goal.id, path: { id: path.id } });
      return <GoalCard key={goal.id} goal={goal} path={path} actions={actions} loading={loading} />;
    });
  }

  renderPath(path) {
    const { actions } = this.props;
    return (
      <div key={path.id}>
        <PathHeader path={path} actions={actions} />
        <div style={styles.pathsWrapper}>
          {this.renderGoals(path)}
        </div>
      </div>
    );
  }

  renderCreateAPathButton() {
    const { loggedInUser, userId } = this.props;
    const isUserAdmin = loggedInUser.isAdmin;
    const isBrowsingOwnProfile = loggedInUser.id === userId;

    let createAPathButton = null;
    if (isUserAdmin || isBrowsingOwnProfile) {
      createAPathButton = (
        <RaisedButton
          label="Create A Path"
          backgroundColor="#8FD694"
          labelColor="#FFFFFF"
          onTouchTap={() => this.handleCreatePath()}
          style={styles.addPathButton}
        />
      );
    }

    return createAPathButton;
  }

  render() {
    const { paths } = this.props;

    if (paths.loading) {
      return <Loading />;
    }

    return (
      <div>
        {map(paths.list, (path) => this.renderPath(path))}
        {this.renderCreateAPathButton()}
      </div>
    );
  }
}

Paths.propTypes = {
  actions: React.PropTypes.object.isRequired,
  userId: React.PropTypes.string.isRequired,
  paths: React.PropTypes.object.isRequired,
  loggedInUser: React.PropTypes.object.isRequired
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
    margin: '20px auto 0 auto',
    width: '40%',
  }
};

export default Paths;
