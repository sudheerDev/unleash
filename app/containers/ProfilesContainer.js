/**
 * Unleash | ProfilesContainer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import * as ProfileActions from '../actions/ProfileActions';
import * as SkillActions from '../actions/SkillActions';
import Profiles from '../components/Profiles';

function getProfilesBySkills(state) {
  const profiles = state.profiles;
  const profilesBySkill = state.profilesBySkill;
  const searching = profilesBySkill.calledBy === 'profile';

  if (searching) {
    return {
      list: filter(profiles.list, profile => includes(profilesBySkill.profiles, profile.id)),
    };
  }

  return profiles;
}

function mapStateToProps(state) {
  const { profiles, skills } = state;
  const isLoading = profiles.isLoading || skills.isLoading;
  return {
    profiles: getProfilesBySkills(state).list,
    skills: skills.list,
    isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, ProfileActions, SkillActions), dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profiles));
