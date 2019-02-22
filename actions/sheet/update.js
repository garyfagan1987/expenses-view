import { SHEET_UPDATE, SHEET_UPDATE_ERROR, SHEET_UPDATE_SUCCESS } from './actions';

export function sheetUpdate(data) {
  return {
    payload: data,
    type: SHEET_UPDATE,
  };
}

export function sheetUpdateError() {
  return {
    type: SHEET_UPDATE_ERROR,
  };
}

export function sheetUpdateSuccess() {
  return {
    type: SHEET_UPDATE_SUCCESS,
  };
}
