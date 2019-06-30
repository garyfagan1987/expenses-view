import { put } from 'redux-saga/effects';
import Router from 'next/router';
import { message as antMessage } from 'antd';

import { sheetUpdateError, sheetUpdateSuccess } from '../../actions/report/update';
import { transformUpdateSheet } from '../../helpers/transformers';
import sheetsPath from '../../config/endpoints';
import messages from '../../config/messages';

const message = messages.report;

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
      antMessage.error(message.error);
      throw new Error(message.error);
    }
    antMessage.success(message.success);
    yield put(sheetUpdateSuccess());
    Router.push({
      pathname: '/reports',
    });
  } catch (err) {
    yield put(sheetUpdateError());
  }
}
