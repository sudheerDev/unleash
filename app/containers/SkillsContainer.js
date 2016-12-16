/**
 * Unleash | SkillsContainer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as SkillActions from '../actions/SkillActions';
import Skills from '../components/Skills';

function mapStateToProps(state) {
  return {
    skills: state.skills,
    addModalParameters: state.skills.addSkillModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SkillActions, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Skills));
