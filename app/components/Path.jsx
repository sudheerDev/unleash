import React, { Component } from 'react';
import map from 'lodash/map';
import some from 'lodash/some';
import RaisedButton from 'material-ui/RaisedButton';
import GoalCard from './GoalCard';
import PathHeader from './PathHeader';
import Loading from './Loading';

let styles = {};

class Paths extends Component {

  handleCreatePath() {
    const { actions, profile } = this.props;
    actions.pathsCreate(profile.id);
  }

  renderGoals(path) {
    const { actions, paths, editable, profile } = this.props;

    return map(path.goals, (goal) => {
      const loading = some(paths.goals, { id: goal.id, path: { id: path.id } });
      return (
        <GoalCard
          key={goal.id}
          goal={goal}
          path={path}
          actions={actions}
          loading={loading}
          editable={editable}
          profile={profile}
          paths={paths.list}
        />
      );
    });
  }

  renderPath(path) {
    const { actions, editable } = this.props;

    return (
      <div key={path.id}>
        <PathHeader path={path} actions={actions} showActions={editable} />
        <div style={styles.pathsWrapper}>
          {this.renderGoals(path)}
        </div>
      </div>
    );
  }

  renderCreateAPathButton() {
    const { editable } = this.props;

    let createAPathButton = null;
    if (editable) {
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

    if (paths.isLoading) {
      return <Loading />;
    }

    return (
      <div>
        {map(paths.list, path => this.renderPath(path))}
        {this.renderCreateAPathButton()}
      </div>
    );
  }
}

Paths.propTypes = {
  actions: React.PropTypes.shape({
    pathsCreate: React.PropTypes.func,
  }).isRequired,
  profile: React.PropTypes.shape({
    id: React.PropTypes.string,
    fullName: React.PropTypes.string,
    picture: React.PropTypes.string,
  }),
  paths: React.PropTypes.shape({
    goals: React.PropTypes.array,
    list: React.PropTypes.array,
    isLoading: React.PropTypes.boolean,
  }).isRequired,
  editable: React.PropTypes.bool.isRequired,
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
  },
};

export default Paths;
