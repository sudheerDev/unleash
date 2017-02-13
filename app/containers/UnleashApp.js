import { connect } from 'react-redux';
import UnleashApp from '../components/UnleashApp';
import AuthService from '../services/authService';

function mapStateToProps(state) {
  const isLoggedIn = state.user.isLoggedIn;
  const isLoading = state.user.isLoading;
  const authServiceInit = state.user.authServiceInit;
  return {
    isLoggedIn,
    isLoading,
    authServiceInit,
  };
}

function mapDispatchToProps() {
  return {
    userLoginProcess: () => {
      AuthService.userLogin();
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnleashApp);
