import { put } from 'redux-saga/effects';
import { message } from 'antd';

import { sheetUpdateError, sheetUpdateSuccess } from '../../actions/sheet/update';
import { transformUpdateSheet } from '../../helpers/transformers';
import sheetsPath from '../../config/endpoints';

export default function* updateSheet({ payload: { values, token } }) {
  try {
    const payload = transformUpdateSheet({ ...values });
    // eslint-disable-next-line no-underscore-dangle
    const res = yield fetch(`${sheetsPath}/${values._id}`, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      method: 'PUT',
    });
    if (res.status !== 200) {
      message.error('Sheet could not be updated');
      throw new Error('Bad response from server');
    }
    message.success('Sheet has been updated');
    yield put(sheetUpdateSuccess());
  } catch (err) {
    yield put(sheetUpdateError());
  }
}
