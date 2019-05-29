import { USER_REGISTER, USER_REGISTER_ERROR, USER_REGISTER_SUCCESS } from './actions';

export const userRegister = values => ({
  payload: values,
  type: USER_REGISTER,
});

export function userRegisterError() {
  return {
    type: USER_REGISTER_ERROR,
  };
}

export function userRegisterSuccess() {
  return {
    type: USER_REGISTER_SUCCESS,
  };
}
