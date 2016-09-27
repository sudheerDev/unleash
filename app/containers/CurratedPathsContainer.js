import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as CurratedPathsActions from '../actions/CurratedPathsActions';
import CurratedPaths from '../components/CurratedPaths';

function mapStateToProps(state) {
  return {
    curratedPaths: state.curratedPaths,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CurratedPathsActions, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CurratedPaths));
