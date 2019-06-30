import { put } from 'redux-saga/effects';
import { message } from 'antd';

import { sheetFetchError, sheetFetchSuccess } from '../../actions/report/report';
import sheetsPath from '../../config/endpoints';
import messages from '../../config/messages';

export default function* loadSheet({ payload: { slug, token } }) {
  try {
    const response = yield fetch(`${sheetsPath}/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      method: 'GET',
    });
    if (response.status !== 200) {
      message.error(messages.report.error);
      throw new Error(messages.report.error);
    }
    const report = yield response.json();
    yield put(sheetFetchSuccess(report));
  } catch (err) {
    yield put(sheetFetchError());
  }
}
