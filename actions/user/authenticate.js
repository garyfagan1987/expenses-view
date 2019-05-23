import { USER_AUTHENTICATE, USER_AUTHENTICATE_ERROR, USER_AUTHENTICATE_SUCCESS } from './actions';

export const userAuthenticate = values => ({
  payload: values,
  type: USER_AUTHENTICATE,
});

export function userAuthenticateError() {
  return {
    type: USER_AUTHENTICATE_ERROR,
  };
}

export function userAuthenticateSuccess(data) {
  return {
    payload: data.token,
    type: USER_AUTHENTICATE_SUCCESS,
  };
}
