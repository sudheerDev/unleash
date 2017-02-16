import { connect } from 'react-redux';
import UnleashApp from '../components/UnleashApp';
import AuthService from '../services/authService';
import { removeNotification } from '../actions/NotificationActions';

function mapStateToProps(state) {
  const isLoggedIn = state.user.isLoggedIn;
  const isLoading = state.user.isLoading;
  const authServiceInit = state.user.authServiceInit;
  return {
    isLoggedIn,
    isLoading,
    authServiceInit,
    notifications: state.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userLoginProcess: () => {
      AuthService.userLogin();
    },
    removeNotification: () => {
      dispatch(removeNotification());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnleashApp);
