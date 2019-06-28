import { SHEET_FETCH_ERROR, SHEET_FETCH_REQUESTED, SHEET_FETCH_SUCCESS } from './actions';

export function sheetFetchError() {
  return {
    type: SHEET_FETCH_ERROR,
  };
}

export const sheetFetch = (slug, token) => ({
  payload: { slug, token },
  type: SHEET_FETCH_REQUESTED,
});

export function sheetFetchSuccess(data) {
  return {
    payload: data,
    type: SHEET_FETCH_SUCCESS,
  };
}
