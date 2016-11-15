export const USER = {
  LOGIN: 'USER_LOGIN',
  LOGOUT: 'USER_LOGOUT'
};

export function userLogin(userData) {
  return { type: USER.LOGIN, userData };
}

export function userLogout() {
  return { type: USER.LOGOUT };
}
