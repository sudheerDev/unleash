import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as CuratedPathsActions from '../actions/CuratedPathsActions';
import CuratedPaths from '../components/CuratedPaths';

function mapStateToProps(state) {
  return {
    curatedPaths: state.curatedPaths,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CuratedPathsActions, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CuratedPaths));
