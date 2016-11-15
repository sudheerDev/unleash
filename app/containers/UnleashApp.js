import { connect } from 'react-redux';
import UnleashApp from '../components/UnleashApp';
import AuthService from '../services/authService';

function mapStateToProps(state) {
  const isLoggedIn = state.user.isLoggedIn;
  return {
    isLoggedIn
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
