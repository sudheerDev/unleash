import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Menu from '../components/Menu';
import AuthService from '../services/authService';

function mapStateToProps(state) {
  const userId = state.user.getIn(['userData', 'id']);
  return {
    userId,
  };
}

function mapDispatchToProps() {
  return {
    userLogoutProcess: () => {
      AuthService.userLogout();
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
