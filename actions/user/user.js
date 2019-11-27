import { USER_FETCH_ERROR, USER_FETCH_REQUESTED, USER_FETCH_SUCCESS } from './actions';

export const userFetchError = () => ({
  type: USER_FETCH_ERROR,
});

export const userFetch = token => ({
  payload: token,
  type: USER_FETCH_REQUESTED,
});

export const userFetchSuccess = data => ({
  payload: data,
  type: USER_FETCH_SUCCESS,
});
