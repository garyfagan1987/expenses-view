import 'isomorphic-unfetch';
import { all, takeLatest } from 'redux-saga/effects';

import { SHEETS_FETCH_REQUESTED } from '../actions/sheets/actions';
import {
  SHEET_CREATE, SHEET_DELETE, SHEET_FETCH_REQUESTED, SHEET_UPDATE,
} from '../actions/sheet/actions';
import createSheet from './sheets/create';
import deleteSheet from './sheets/delete';
import updateSheet from './sheets/update';
import loadSheet from './sheet/sheet';
import loadSheets from './sheets/sheets';

function* rootSaga() {
  yield all([
    takeLatest(SHEETS_FETCH_REQUESTED, loadSheets),
    takeLatest(SHEET_DELETE, deleteSheet),
    takeLatest(SHEET_CREATE, createSheet),
    takeLatest(SHEET_FETCH_REQUESTED, loadSheet),
    takeLatest(SHEET_UPDATE, updateSheet),
  ]);
}

export default rootSaga;
