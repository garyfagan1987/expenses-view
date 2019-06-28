import { SHEET_CREATE, SHEET_CREATE_ERROR, SHEET_CREATE_SUCCESS } from './actions';

export const sheetCreate = (values, token) => ({
  payload: { token, values },
  type: SHEET_CREATE,
});

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
