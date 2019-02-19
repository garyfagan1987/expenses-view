import { SHEET_FETCH_ERROR, SHEET_FETCH_REQUESTED, SHEET_FETCH_SUCCESS } from './actions';

export function sheetFetchError() {
  return {
    type: SHEET_FETCH_ERROR,
  };
}

export function sheetFetch(data) {
  return {
    payload: data,
    type: SHEET_FETCH_REQUESTED,
  };
}

export function sheetFetchSuccess(data) {
  return {
    payload: data,
    type: SHEET_FETCH_SUCCESS,
  };
}
