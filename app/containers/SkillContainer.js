/**
 * Unleash | SkillContainer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 * @author Rubens Mariuzzo <rubens@x-team.com>
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as SkillActions from '../actions/SkillActions';
import * as ProfileActions from '../actions/ProfileActions';
import Skill from '../components/Skill';

function mapStateToProps(state) {
  return {
    profilesBySkill: state.profilesBySkill.profiles,
    bySkillLoading: state.profilesBySkill.isLoading,
    skills: state.skills.list,
    skillsLoading: state.skills.isLoading,
    profiles: state.profiles.list,
    profilesLoading: state.profiles.isLoading,
    userId: state.user.userData.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SkillActions,
      ...ProfileActions,
    }, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Skill));
