/**
 * Unleash | DashboardContainer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Rubens Mariuzzo <rubens@x-team.com>
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as AnnouncementActions from '../actions/AnnouncementActions';
import * as NewsActions from '../actions/NewsActions';
import Dashboard from '../components/Dashboard';

function mapStateToProps(state) {
  return {
    announcements: state.announcements,
    news: state.news,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...AnnouncementActions, ...NewsActions }, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard));
