import { put } from 'redux-saga/effects';

import { message } from 'antd';

import { sheetsFetch } from '../../actions/sheets/sheets';
import { sheetDeleteError, sheetDeleteSuccess } from '../../actions/sheet/delete';
import sheetsPath from '../../config/endpoints';

export default function* deleteSheet({ payload: { id, token } }) {
  try {
    const res = yield fetch(`${sheetsPath}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      method: 'DELETE',
    });
    if (res.status !== 200) {
      message.error('There was a problem trying to delete this sheet');
      throw new Error('Bad response from server');
    }
    message.success('Your sheet was deleted');
    yield put(sheetDeleteSuccess());
    yield put(sheetsFetch(token));
  } catch (err) {
    yield put(sheetDeleteError());
  }
}
