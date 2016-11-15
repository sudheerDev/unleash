import { USER } from '../actions/UserActions';

export const initialState = {
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
};

function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER.LOGIN:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.userData
        },
        isLoggedIn: true
      };
    case USER.LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export default userReducer;
