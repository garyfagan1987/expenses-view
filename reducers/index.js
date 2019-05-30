import {
  USER_AUTHENTICATE_ERROR,
  USER_AUTHENTICATE_SUCCESS,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_SUCCESS,
} from '../actions/user/actions';

import {
  SHEET_DELETE,
  SHEET_DELETE_ERROR,
  SHEET_DELETE_SUCCESS,
  SHEET_FETCH_ERROR,
  SHEET_FETCH_SUCCESS,
  SHEET_UPDATE_CALCULATION,
} from '../actions/sheet/actions';

import {
  SHEETS_FETCH_ERROR,
  SHEETS_FETCH_REQUESTED,
  SHEETS_FETCH_SUCCESS,
} from '../actions/sheets/actions';

export const initialState = {
  isAuthenticated: undefined,
  sheet: {
    fetch: { error: true, success: {} },
  },
  sheets: {
    error: false,
    loading: false,
    success: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTHENTICATE_ERROR:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case USER_LOGOUT_ERROR:
      return {
        ...state,
        isAuthenticated: true,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SHEETS_FETCH_REQUESTED:
      return {
        ...state,
        sheets: {
          error: false,
          loading: true,
          success: [],
        },
      };
    case SHEETS_FETCH_SUCCESS:
      return {
        ...state,
        sheets: {
          error: false,
          loading: false,
          success: action.payload,
        },
      };
    case SHEETS_FETCH_ERROR:
      return {
        ...state,
        sheets: {
          error: true,
          loading: false,
          success: [],
        },
      };
    case SHEET_FETCH_SUCCESS:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          fetch: {
            success: action.payload,
          },
        },
      };
    case SHEET_FETCH_ERROR:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          fetch: {
            success: {},
          },
        },
      };
    case SHEET_UPDATE_CALCULATION:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          fetch: {
            success: action.payload,
          },
        },
      };
    default:
      return state;
  }
};
