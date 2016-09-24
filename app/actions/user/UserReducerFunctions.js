import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  isLoggedIn: false,
  userData: {
    id: null,
    fullName: null,
    isAdmin: false,
    picture: null,
    firstName: null,
    lastName: null,
    email: null,
    username: null
  }
});

const getDefaultState = () => defaultState;

const userLogin = (state, action) =>
  state
    .set('userData', Immutable.fromJS(action.userData))
    .set('isLoggedIn', true);

const userLogout = () => defaultState;

export default {
  getDefaultState,
  userLogin,
  userLogout,
};
