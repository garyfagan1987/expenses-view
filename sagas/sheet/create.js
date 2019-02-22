import { put } from 'redux-saga/effects';

import { sheetCreateError, sheetCreateSuccess } from '../../actions/sheet/create';
import headers from '../../config/headers';
import sheetsPath from '../../config/endpoints';

export default function* createSheet(data) {
  try {
    const res = yield fetch(sheetsPath, {
      ...headers,
      body: JSON.stringify(data.payload),
      method: 'POST',
    });
    if (res.status !== 200) {
      throw new Error('Bad response from server');
    }
    yield put(sheetCreateSuccess());
  } catch (err) {
    yield put(sheetCreateError());
  }
}