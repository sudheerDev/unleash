/**
 * Unleash | ProfilesContainer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as ProfileActions from '../actions/ProfileActions';
import * as SkillActions from '../actions/SkillActions';
import Profiles from '../components/Profiles';
import _ from 'lodash';

function getProfilesBySkills(state) {
  const profiles = state.profiles;
  const profilesBySkill = state.profilesBySkill;
  const searching = profilesBySkill.calledBy === 'profile';

  if (searching) {
    return {
      list: _.filter(profiles.list, (profile) => _.includes(profilesBySkill.profiles, profile.id)),
    };
  }

  return profiles;
}

function mapStateToProps(state) {
  return {
    profiles: getProfilesBySkills(state),
    skills: state.skills,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, ProfileActions, SkillActions), dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles));
