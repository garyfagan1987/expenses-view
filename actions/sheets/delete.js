import { SHEET_DELETE, SHEET_DELETE_ERROR, SHEET_DELETE_SUCCESS } from './actions';

export function sheetDelete(data) {
  return {
    payload: data,
    type: SHEET_DELETE,
  };
}

export function sheetDeleteError() {
  return {
    type: SHEET_DELETE_ERROR,
  };
}

export function sheetDeleteSuccess() {
  return {
    type: SHEET_DELETE_SUCCESS,
  };
}
