import { put } from 'redux-saga/effects';

import { sheetFetchError, sheetFetchSuccess } from '../../actions/sheet/sheet';
import sheetsPath from '../../config/endpoints';

export default function* loadSheet({ payload: { slug, token } }) {
  try {
    const response = yield fetch(`${sheetsPath}/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      method: 'GET',
    });
    const sheet = yield response.json();
    yield put(sheetFetchSuccess(sheet));
  } catch (err) {
    yield put(sheetFetchError());
  }
}
