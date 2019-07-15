import { put } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import getConfig from 'next/config';

import { sheetFetchError, sheetFetchSuccess } from '../../actions/report/report';
import sheetsPath from '../../config/endpoints';
import messages from '../../config/messages';

const { publicRuntimeConfig: { API_PATH } } = getConfig();
const message = messages.report;

export default function* loadSheet({ payload: { slug, token } }) {
  try {
    const response = yield fetch(`${API_PATH}${sheetsPath}/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      method: 'GET',
    });
    if (response.status !== 200) {
      antMessage.error(message.error);
      throw new Error(message.error);
    }
    const report = yield response.json();
    yield put(sheetFetchSuccess(report));
  } catch (err) {
    yield put(sheetFetchError());
  }
}
