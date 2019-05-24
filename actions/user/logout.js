import { USER_LOGOUT, USER_LOGOUT_ERROR, USER_LOGOUT_SUCCESS } from './actions';

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export function userLogoutError() {
  return {
    type: USER_LOGOUT_ERROR,
  };
}

export function userLogoutSuccess() {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
}
