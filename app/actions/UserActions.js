export const USER = {
  AUTH: {
    LOGIN_START: 'AUTH_LOGIN_START',
    LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',
    LOGOUT: 'AUTH_LOGOUT',
  },
};

export function userLogin(userData) {
  return { type: USER.AUTH.LOGIN_SUCCESS, userData };
}

export function userLogout() {
  return { type: USER.AUTH.LOGOUT };
}

export function startLoginProcess() {
  return { type: USER.AUTH.LOGIN_START };
}

export function userLoginFailure() {
  return { type: USER.AUTH.LOGIN_FAILURE };
}
