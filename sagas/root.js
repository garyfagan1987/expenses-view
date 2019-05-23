import 'isomorphic-unfetch';
import { all, takeLatest } from 'redux-saga/effects';

import { USER_AUTHENTICATE } from '../actions/user/actions';
import userAuthenticate from './user/authenticate';

import { SHEETS_FETCH_REQUESTED } from '../actions/sheets/actions';
import {
  SHEET_CREATE, SHEET_DELETE, SHEET_FETCH_REQUESTED, SHEET_UPDATE,
} from '../actions/sheet/actions';
import createSheet from './sheet/create';
import deleteSheet from './sheet/delete';
import updateSheet from './sheet/update';
import loadSheet from './sheet/sheet';
import loadSheets from './sheets/sheets';

function* rootSaga() {
  yield all([
    takeLatest(USER_AUTHENTICATE, userAuthenticate),
    takeLatest(SHEETS_FETCH_REQUESTED, loadSheets),
    takeLatest(SHEET_DELETE, deleteSheet),
    takeLatest(SHEET_CREATE, createSheet),
    takeLatest(SHEET_FETCH_REQUESTED, loadSheet),
    takeLatest(SHEET_UPDATE, updateSheet),
  ]);
}

export default rootSaga;
