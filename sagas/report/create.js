import { put } from 'redux-saga/effects';
import Router from 'next/router';
import { message } from 'antd';

import { sheetCreateError, sheetCreateSuccess } from '../../actions/report/create';
import { transformCreateSheet } from '../../helpers/transformers';
import sheetsPath from '../../config/endpoints';
import messages from '../../config/messages';

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
      message.error(messages.reportCreate.error);
      throw new Error(messages.reportCreate.error);
    }
    yield put(sheetCreateSuccess());
    message.success('Report has been created');
    Router.push({
      pathname: '/reports',
    });
  } catch (err) {
    yield put(sheetCreateError());
  }
}
