import { USER } from '../actions/UserActions';

export const initialState = {
  authServiceInit: false,
  isLoading: false,
  isLoggedIn: false,
  userData: {
    id: null,
    fullName: null,
    isAdmin: false,
    picture: null,
    firstName: null,
    lastName: null,
    email: null,
    username: null,
  },
};

function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER.AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.userData,
        },
        isLoggedIn: true,
        isLoading: false,
        authServiceInit: true,
      };
    case USER.AUTH.LOGOUT:
      return {
        ...initialState,
        isLoading: false,
        authServiceInit: true,
      };
    case USER.AUTH.LOGIN_START:
      return {
        ...initialState,
        isLoading: true,
        authServiceInit: true,
      };
    case USER.AUTH.LOGIN_FAILURE:
      return {
        ...initialState,
        isLoading: false,
        authServiceInit: true,
      };
    default:
      return state;
  }
}

export default userReducer;
