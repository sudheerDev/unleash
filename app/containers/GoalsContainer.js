/**
 * Unleash | GoalsContainer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import GoalsActionCreators from '../actions/goals/GoalsActionCreators';
import Goals from '../components/Goals';

function mapStateToProps(state) {
  const list = state.goals.get('list').toJS();
  const addModalParameters = state.goals.get('addGoalsModal').toJS();
  return {
    list,
    addModalParameters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GoalsActionCreators, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Goals));
