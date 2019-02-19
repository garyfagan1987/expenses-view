import { put } from 'redux-saga/effects';

import { sheetFetchError, sheetFetchSuccess } from '../../actions/sheet/sheet';
import headers from '../../config/headers';
import sheetsPath from '../../config/endpoints';

export default function* loadSheet(data) {
  try {
    const res = yield fetch(`${sheetsPath}/${data.payload}`, {
      ...headers,
      method: 'GET',
    });
    const sheet = yield res.json();
    yield put(sheetFetchSuccess(sheet));
  } catch (err) {
    yield put(sheetFetchError());
  }
}
