import { put } from 'redux-saga/effects';

import { sheetCreateError, sheetCreateSuccess } from '../../actions/sheet/create';
import { transformCreateSheet } from '../../helpers/transformers';
import sheetsPath from '../../config/endpoints';

export default function* createSheet({ payload: { values, token } }) {
  try {
    const payload = transformCreateSheet({ ...values });
    const res = yield fetch(sheetsPath, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
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
