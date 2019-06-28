import { SHEET_DELETE, SHEET_DELETE_ERROR, SHEET_DELETE_SUCCESS } from './actions';

export const sheetDelete = (id, token) => ({
  payload: { id, token },
  type: SHEET_DELETE,
});

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
