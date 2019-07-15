import { put } from 'redux-saga/effects';
import Router from 'next/router';
import getConfig from 'next/config';
import { message as antMessage } from 'antd';

import { sheetCreateError, sheetCreateSuccess } from '../../actions/report/create';
import { transformCreateSheet } from '../../helpers/transformers';
import sheetsPath from '../../config/endpoints';
import messages from '../../config/messages';

const { publicRuntimeConfig: { API_PATH } } = getConfig();
const message = messages.create;

export default function* createSheet({ payload: { values, token } }) {
  try {
    const payload = transformCreateSheet({ ...values });
    const res = yield fetch(`${API_PATH}${sheetsPath}`, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      method: 'POST',
    });
    if (res.status !== 200) {
      antMessage.error(message.error);
      throw new Error(message.error);
    }
    yield put(sheetCreateSuccess());
    antMessage.success('Report has been created');
    Router.push({
      pathname: '/reports',
    });
  } catch (err) {
    yield put(sheetCreateError());
  }
}
