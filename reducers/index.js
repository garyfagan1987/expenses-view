import {
  USER_AUTHENTICATE,
  USER_AUTHENTICATE_ERROR,
  USER_AUTHENTICATE_SUCCESS,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_SUCCESS,
} from '../actions/user/actions';

import {
  SHEET_FETCH_ERROR,
  SHEET_FETCH_SUCCESS,
  SHEET_UPDATE_CALCULATION,
} from '../actions/report/actions';

import {
  SHEETS_FETCH_ERROR,
  SHEETS_FETCH_REQUESTED,
  SHEETS_FETCH_SUCCESS,
} from '../actions/reports/actions';

export const initialState = {
  isAuthenticated: undefined,
  isLoading: false,
  report: {
    fetch: { error: true, success: {} },
  },
  reports: {
    error: false,
    loading: false,
    success: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
      };
    case USER_AUTHENTICATE_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    case USER_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
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
        reports: {
          error: false,
          loading: true,
          success: [],
        },
      };
    case SHEETS_FETCH_SUCCESS:
      return {
        ...state,
        reports: {
          error: false,
          loading: false,
          success: action.payload,
        },
      };
    case SHEETS_FETCH_ERROR:
      return {
        ...state,
        reports: {
          error: true,
          loading: false,
          success: [],
        },
      };
    case SHEET_FETCH_SUCCESS:
      return {
        ...state,
        report: {
          ...state.report,
          fetch: {
            success: action.payload,
          },
        },
      };
    case SHEET_FETCH_ERROR:
      return {
        ...state,
        report: {
          ...state.report,
          fetch: {
            success: {},
          },
        },
      };
    case SHEET_UPDATE_CALCULATION:
      return {
        ...state,
        report: {
          ...state.report,
          fetch: {
            success: action.payload,
          },
        },
      };
    default:
      return state;
  }
};
