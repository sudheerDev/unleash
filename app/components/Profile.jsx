import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { routerShape } from 'react-router/lib/PropTypes';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import Path from './Path';
import UserCard from './UserCard';
import AddGoalsModal from './AddGoalsModal';
import AddExistingGoalsModal from './AddExistingGoalsModal';

let styles = {};

class Profile extends Component {

  componentDidMount() {
    const { params, actions } = this.props;
    const userId = params.userId;
    actions.fetchProfile(userId);
    actions.pathsList(userId);
    actions.fetchGoals();
  }

  render() {
    const {
      actions,
      params,
      paths,
      goals,
      profiles,
      loggedInUser,
      addModalParameters,
      addExistingGoalsModalParameters,
    } = this.props;

    const userId = params.userId;
    const editable = loggedInUser.isAdmin || loggedInUser.id === userId;
    const skills = [
      { name: 'mongoDB', id: 'c390be96-168b-4f42-a0cd-933fbc46e249' },
      { name: 'React', id: 'c390be96-168b-4f42-a0cd-933fbc46e240' },
    ];
    const tags = [];
    let addGoalButton = null;
    if (editable) {
      addGoalButton = (
        <div>
          <FloatingActionButton
            style={styles.addCustomButton}
            onClick={() => actions.showAddGoalsModal(true)}
          >
            <ContentAdd />
          </FloatingActionButton>
          <AddExistingGoalsModal
            parameters={addExistingGoalsModalParameters}
            paths={paths.list}
            goals={goals}
            profile={profiles.profile}
            actions={actions}
          />
          <FloatingActionButton
            style={styles.addExistingButton}
            onClick={() => actions.showAddExistingGoalsModal(true)}
          >
            <ContentPaste />
          </FloatingActionButton>
          <AddGoalsModal
            parameters={addModalParameters}
            actions={actions}
            tagsOptions={tags}
            onSubmit={actions.addGoalToPathRequest}
            withPath
          />
        </div>
      );
    }

    addModalParameters.paths = paths.list;

    return (
      <div>
        <div style={styles.userWrapper}>
          <UserCard user={profiles.profile} router={this.props.router} key={userId} />
        </div>
        <div style={styles.skillsWrapper}>
          {skills.map(skill => (
            <Paper key={skill.id} style={styles.skill} zDepth={2} circle >
              <span style={styles.skillTitle}>{skill.name}</span>
            </Paper>
          ))}
        </div>
        <Path
          userId={userId}
          actions={actions}
          paths={paths}
          editable={editable}
          loggedInUser={loggedInUser}
        />
        {addGoalButton}
      </div>
    );
  }
}

Profile.propTypes = {
  actions: React.PropTypes.shape({
    fetchProfile: React.PropTypes.func.isRequired,
    pathsList: React.PropTypes.func.isRequired,
  }).isRequired,
  router: routerShape.isRequired,
  params: React.PropTypes.shape({
    userId: React.PropTypes.string,
  }).isRequired,
  paths: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    list: React.PropTypes.array.isRequired,
  }).isRequired,
  profiles: React.PropTypes.shape({
    profile: React.PropTypes.object.isRequired,
  }).isRequired,
  loggedInUser: React.PropTypes.shape({
    isAdmin: React.PropTypes.bool.isRequired,
    id: React.PropTypes.string.isRequired,
  }).isRequired,
  addModalParameters: React.PropTypes.shape({
    showModal: React.PropTypes.bool,
    showSpinner: React.PropTypes.bool,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    tags: React.PropTypes.array,
    icon: React.PropTypes.string,
    level: React.PropTypes.string,
  }).isRequired,
  goals: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  addExistingGoalsModalParameters: React.PropTypes.shape({
    showModal: React.PropTypes.bool,
    showSpinner: React.PropTypes.bool,
    selectedPath: React.PropTypes.object,
    selectedGoal: React.PropTypes.object,
  }).isRequired,
};

export default Profile;

styles = {
  skill: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '80px',
    height: '80px',
    margin: '20px 20px 50px',
    padding: '20px',
    textAlign: 'center',
    color: '#5f5f5f',
  },
  skillTitle: {
    display: 'flex',
    flexGrow: '1',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: '12px',
    fontWeight: '200',
    padding: '5px',
    marginTop: '10px',
  },
  skillsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 'auto',
    width: '90%',
    maxWidth: '1150px',
  },
  userWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 'auto',
    width: '90%',
    maxWidth: '1150px',
  },
  addCustomButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
  addExistingButton: {
    position: 'fixed',
    bottom: '20px',
    right: '100px',
  },
};
