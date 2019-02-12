import { put } from 'redux-saga/effects';

import { sheetsFetchError, sheetsFetchSuccess } from '../../actions/sheets/sheets';
import headers from '../../config/headers';
import sheetsPath from '../../config/endpoints';

export default function* loadSheets() {
  try {
    const res = yield fetch(sheetsPath, {
      ...headers,
      method: 'GET',
    });
    const sheets = yield res.json();
    yield put(sheetsFetchSuccess(sheets));
  } catch (err) {
    yield put(sheetsFetchError());
  }
}
