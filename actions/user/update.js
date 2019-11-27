import {
  USER_UPDATE, USER_UPDATE_ERROR, USER_UPDATE_SUCCESS,
} from './actions';

export const userUpdate = (values, token) => ({
  payload: { token, values },
  type: USER_UPDATE,
});

export const userUpdateError = () => ({
  type: USER_UPDATE_ERROR,
});

export const userUpdateSuccess = () => ({
  type: USER_UPDATE_SUCCESS,
});