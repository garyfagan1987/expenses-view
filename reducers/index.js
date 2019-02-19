import {
  SHEET_FETCH_ERROR,
  SHEET_FETCH_REQUESTED,
  SHEET_FETCH_SUCCESS,
} from '../actions/sheet/actions';

import {
  SHEET_CREATE_ERROR,
  SHEET_CREATE_SUCCESS,
  SHEET_DELETE_ERROR,
  SHEET_DELETE_SUCCESS,
  SHEETS_FETCH_ERROR,
  SHEETS_FETCH_REQUESTED,
  SHEETS_FETCH_SUCCESS,
} from '../actions/sheets/actions';

export const initialSheetState = {
  sheetCreateError: false,
  sheetDeleteError: false,
  sheets: [],
  sheetsError: false,
  sheetsLoading: false,
};

export default (state = initialSheetState, action) => {
  switch (action.type) {
    case SHEETS_FETCH_REQUESTED:
      return { ...state, sheets: action.payload, sheetsLoading: true };
    case SHEETS_FETCH_SUCCESS:
      return { ...state, sheets: action.payload, sheetsLoading: false };
    case SHEETS_FETCH_ERROR:
      return { ...state, sheetsError: true, sheetsLoading: false };
    case SHEET_DELETE_ERROR:
      return { ...state, sheetDeleteError: true, sheetsLoading: false };
    case SHEET_DELETE_SUCCESS:
      return { ...state, sheetDeleteSuccess: true, sheetsLoading: false };
    case SHEET_CREATE_ERROR:
      return { ...state, sheetCreateError: true, sheetsLoading: false };
    case SHEET_CREATE_SUCCESS:
      return { ...state, sheetCreateSuccess: true, sheetsLoading: false };
    case SHEET_FETCH_REQUESTED:
      return { ...state, sheet: action.payload };
    case SHEET_FETCH_SUCCESS:
      return { ...state, sheet: action.payload };
    case SHEET_FETCH_ERROR:
      return { ...state, sheetError: true };
    default:
      return state;
  }
};
