/**
 * Unleash | ProfileContainer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Sergio Tashdjian <sergio.tashdjian@x-team.com>
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as ProfileActions from '../actions/ProfileActions';
import * as PathsActions from '../actions/PathsActions';
import * as GoalsActions from '../actions/GoalsActions';
import Profile from '../components/Profile';

function mapStateToProps(state) {
  const { profiles, paths, goals, user } = state;
  const isLoading = profiles.isLoading || paths.isLoading || goals.isLoading || user.isLoading;
  return {
    profiles,
    paths,
    goals: goals.list,
    userId: state.userId,
    loggedInUser: user.userData,
    addModalParameters: goals.addGoalsModal,
    addExistingGoalsModalParameters: goals.addExistingGoalsModal,
    isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...ProfileActions,
      ...PathsActions,
      ...GoalsActions,
    }, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile));
