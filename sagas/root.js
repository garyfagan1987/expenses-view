import 'isomorphic-unfetch';
import { all, takeLatest } from 'redux-saga/effects';

import { SHEET_CREATE, SHEET_DELETE, SHEETS_FETCH_REQUESTED } from '../actions/sheets/actions';
import createSheet from './sheets/create';
import deleteSheet from './sheets/delete';
import loadSheets from './sheets/sheets';

function* rootSaga() {
  yield all([
    takeLatest(SHEETS_FETCH_REQUESTED, loadSheets),
    takeLatest(SHEET_DELETE, deleteSheet),
    takeLatest(SHEET_CREATE, createSheet),
  ]);
}

export default rootSaga;
