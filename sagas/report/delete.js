import { put } from 'redux-saga/effects';

import { message } from 'antd';

import { sheetsFetch } from '../../actions/reports/reports';
import { sheetDeleteError, sheetDeleteSuccess } from '../../actions/report/delete';
import sheetsPath from '../../config/endpoints';
import messages from '../../config/messages';

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
      message.error(messages.reportDelete.error);
      throw new Error(messages.reportDelete.error);
    }
    message.success(messages.reportDelete.success);
    yield put(sheetDeleteSuccess());
    yield put(sheetsFetch(token));
  } catch (err) {
    yield put(sheetDeleteError());
  }
}
