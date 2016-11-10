import React, { Component } from 'react';
import { map, some } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import GoalCard from './GoalCard';
import PathHeader from './PathHeader';
import Loading from './Loading';

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

  render() {
    const { paths } = this.props;

    if (paths.loading) {
      return <Loading />;
    }

    return (
      <div>
        {map(paths.list, (path) => this.renderPath(path))}
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
  paths: React.PropTypes.object.isRequired,
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
    margin: '20px auto 0 auto',
    width: '40%',
  }
};

export default Paths;
