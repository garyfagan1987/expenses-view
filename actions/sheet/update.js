import {
  SHEET_UPDATE, SHEET_UPDATE_CALCULATION, SHEET_UPDATE_ERROR, SHEET_UPDATE_SUCCESS,
} from './actions';

export const sheetUpdate = (values, token) => ({
  payload: { token, values },
  type: SHEET_UPDATE,
});

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

export function sheetUpdateCalculation(data) {
  return {
    payload: data,
    type: SHEET_UPDATE_CALCULATION,
  };
}
