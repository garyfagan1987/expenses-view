import { put } from 'redux-saga/effects';

import { sheetsFetch } from '../../actions/sheets/sheets';
import { sheetDeleteError, sheetDeleteSuccess } from '../../actions/sheet/delete';
import headers from '../../config/headers';
import sheetsPath from '../../config/endpoints';

export default function* deleteSheet(data) {
  try {
    const res = yield fetch(`${sheetsPath}/${data.payload}`, {
      ...headers,
      method: 'DELETE',
    });
    if (res.status !== 200) {
      throw new Error('Bad response from server');
    }
    yield put(sheetDeleteSuccess());
    yield put(sheetsFetch());
  } catch (err) {
    yield put(sheetDeleteError());
  }
}
