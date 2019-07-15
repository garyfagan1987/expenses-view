import { put } from 'redux-saga/effects';
import getConfig from 'next/config';
import { message as antMessage } from 'antd';

import { sheetsFetch } from '../../actions/reports/reports';
import { sheetDeleteError, sheetDeleteSuccess } from '../../actions/report/delete';
import sheetsPath from '../../config/endpoints';
import messages from '../../config/messages';

const { publicRuntimeConfig: { API_PATH } } = getConfig();
const message = messages.delete;

export default function* deleteSheet({ payload: { id, token } }) {
  try {
    const res = yield fetch(`${API_PATH}${sheetsPath}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      method: 'DELETE',
    });
    if (res.status !== 200) {
      antMessage.error(message.error);
      throw new Error(message.error);
    }
    antMessage.success(message.success);
    yield put(sheetDeleteSuccess());
    yield put(sheetsFetch(token));
  } catch (err) {
    yield put(sheetDeleteError());
  }
}
