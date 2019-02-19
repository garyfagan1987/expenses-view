import { SHEET_CREATE, SHEET_CREATE_ERROR, SHEET_CREATE_SUCCESS } from './actions';

export function sheetCreate(data) {
  return {
    payload: data,
    type: SHEET_CREATE,
  };
}

export function sheetCreateError() {
  return {
    type: SHEET_CREATE_ERROR,
  };
}

export function sheetCreateSuccess() {
  return {
    type: SHEET_CREATE_SUCCESS,
  };
}
