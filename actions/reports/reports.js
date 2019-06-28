import { SHEETS_FETCH_ERROR, SHEETS_FETCH_REQUESTED, SHEETS_FETCH_SUCCESS } from './actions';

export const sheetsFetch = token => ({
  payload: token,
  type: SHEETS_FETCH_REQUESTED,
});

export function sheetsFetchError() {
  return {
    type: SHEETS_FETCH_ERROR,
  };
}

export function sheetsFetchSuccess(data) {
  return {
    payload: data,
    type: SHEETS_FETCH_SUCCESS,
  };
}
