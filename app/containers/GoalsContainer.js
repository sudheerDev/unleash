/**
 * Unleash | GoalsContainer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as GoalsActions from '../actions/GoalsActions';
import Goals from '../components/Goals';

function mapStateToProps(state) {
  return {
    list: state.goals.list,
    addModalParameters: state.goals.addGoalsModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GoalsActions, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Goals));
