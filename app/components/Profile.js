import React, { Component } from 'react';
import Path from './Path';
import UserCard from './UserCard';
import Paper from 'material-ui/Paper';

let styles = {};

class Profile extends Component {

  componentDidMount() {
    const { params, actions } = this.props;
    const userId = params.userId;
    actions.fetchProfile(userId);
    actions.pathsList(userId);
  }

  render() {
    const { actions, params, paths, profiles } = this.props;
    const userId = params.userId;
    const skills = [
      { name: 'mongoDB', id: 'c390be96-168b-4f42-a0cd-933fbc46e249' },
      { name: 'React', id: 'c390be96-168b-4f42-a0cd-933fbc46e240' }
    ];
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
        <Path userId={userId} actions={actions} paths={paths} />
      </div>
    );
  }
}

Profile.propTypes = {
  actions: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  paths: React.PropTypes.object.isRequired,
  profiles: React.PropTypes.object.isRequired
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
    marginTop: '10px'
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
};
