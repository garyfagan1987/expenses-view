import {
  USER_AUTHENTICATE_ERROR,
  USER_AUTHENTICATE_SUCCESS,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_SUCCESS,
} from '../actions/user/actions';

import {
  SHEET_CREATE_ERROR,
  SHEET_CREATE_SUCCESS,
  SHEET_DELETE,
  SHEET_DELETE_ERROR,
  SHEET_DELETE_SUCCESS,
  SHEET_FETCH_ERROR,
  SHEET_FETCH_SUCCESS,
  SHEET_UPDATE,
  SHEET_UPDATE_CALCULATION,
  SHEET_UPDATE_ERROR,
  SHEET_UPDATE_SUCCESS,
} from '../actions/sheet/actions';

import {
  SHEETS_FETCH_ERROR,
  SHEETS_FETCH_REQUESTED,
  SHEETS_FETCH_SUCCESS,
} from '../actions/sheets/actions';

export const initialState = {
  authenticate: {
    error: false,
    success: false,
    token: undefined,
  },
  logout: {
    error: false,
    success: false,
  },
  sheet: {
    create: { error: false, success: false },
    delete: { error: false, success: false },
    fetch: { error: true, success: {} },
    update: { error: false, success: false },
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
        authenticate: {
          error: true,
          success: false,
          token: undefined,
        },
      };
    case USER_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authenticate: {
          error: false,
          success: true,
          token: action.payload,
        },
      };
    case USER_LOGOUT_ERROR:
      return {
        ...state,
        logout: {
          error: true,
          success: false,
        },
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        logout: {
          error: false,
          success: true,
        },
      };
    case SHEETS_FETCH_REQUESTED:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          delete: {
            error: undefined,
            success: undefined,
          },
        },
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
    case SHEET_DELETE:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          delete: {
            error: undefined,
            success: undefined,
          },
        },
        sheetsLoading: false,
      };
    case SHEET_DELETE_ERROR:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          delete: {
            error: true,
            success: false,
          },
        },
        sheetsLoading: false,
      };
    case SHEET_DELETE_SUCCESS:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          delete: {
            error: false,
            success: true,
          },
        },
        sheetsLoading: false,
      };
    case SHEET_CREATE_ERROR:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          create: {
            error: true,
            success: false,
          },
        },
        sheetsLoading: false,
      };
    case SHEET_CREATE_SUCCESS:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          create: {
            error: false,
            success: true,
          },
        },
        sheetsLoading: false,
      };
    case SHEET_FETCH_SUCCESS:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          fetch: {
            error: false,
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
            error: true,
            success: {},
          },
        },
      };
    case SHEET_UPDATE:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          update: {
            error: undefined,
            success: undefined,
          },
        },
        sheetsLoading: false,
      };
    case SHEET_UPDATE_ERROR:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          update: {
            error: true,
            success: false,
          },
        },
        sheetsLoading: false,
      };
    case SHEET_UPDATE_SUCCESS:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          update: {
            error: false,
            success: true,
          },
        },
        sheetsLoading: false,
      };
    case SHEET_UPDATE_CALCULATION:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          fetch: {
            error: false,
            success: action.payload,
          },
        },
      };
    default:
      return state;
  }
};
