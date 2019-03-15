import { put } from 'redux-saga/effects';

import { sheetUpdateError, sheetUpdateSuccess } from '../../actions/sheet/update';
import { transformUpdateSheet } from '../../helpers/transformers';
import sheetsPath from '../../config/endpoints';

export default function* updateSheet({ payload: { values, token } }) {
  try {
    const payload = transformUpdateSheet({ ...values });
    const res = yield fetch(`${sheetsPath}/${values._id}`, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      method: 'PUT',
    });
    if (res.status !== 200) {
      throw new Error('Bad response from server');
    }
    yield put(sheetUpdateSuccess());
  } catch (err) {
    yield put(sheetUpdateError());
  }
}
