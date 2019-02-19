import {
  SHEET_CREATE_ERROR,
  SHEET_CREATE_SUCCESS,
  SHEET_DELETE_ERROR,
  SHEET_DELETE_SUCCESS,
  SHEET_FETCH_ERROR,
  SHEET_FETCH_SUCCESS,
} from '../actions/sheet/actions';

import {
  SHEETS_FETCH_ERROR,
  SHEETS_FETCH_REQUESTED,
  SHEETS_FETCH_SUCCESS,
} from '../actions/sheets/actions';

export const initialSheetState = {
  sheet: {
    create: {
      error: false,
      success: false,
    },
    delete: {
      error: false,
      success: false,
    },
    fetch: {
      error: true,
      success: {},
    },
  },
  sheets: {
    error: false,
    loading: false,
    success: [],
  },
};

export default (state = initialSheetState, action) => {
  switch (action.type) {
    case SHEETS_FETCH_REQUESTED:
      return { ...state, sheets: { error: false, loading: true, success: [] } };
    case SHEETS_FETCH_SUCCESS:
      return { ...state, sheets: { error: false, loading: false, success: action.payload } };
    case SHEETS_FETCH_ERROR:
      return { ...state, sheets: { error: true, loading: false, success: [] } };
    case SHEET_DELETE_ERROR:
      return { ...state, sheet: { delete: { error: true, success: false } }, sheetsLoading: false };
    case SHEET_DELETE_SUCCESS:
      return { ...state, sheet: { delete: { error: false, success: true } }, sheetsLoading: false };
    case SHEET_CREATE_ERROR:
      return { ...state, sheet: { create: { error: true, success: false } }, sheetsLoading: false };
    case SHEET_CREATE_SUCCESS:
      return { ...state, sheet: { create: { error: false, success: true } }, sheetsLoading: false };
    case SHEET_FETCH_SUCCESS:
      return { ...state, sheet: { fetch: { error: false, success: action.payload } } };
    case SHEET_FETCH_ERROR:
      return { ...state, sheet: { fetch: { error: true, success: {} } } };
    default:
      return state;
  }
};
