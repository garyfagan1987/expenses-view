import { put } from 'redux-saga/effects';
import Router from 'next/router';
import { message } from 'antd';

import { sheetCreateError, sheetCreateSuccess } from '../../actions/sheet/create';
import { transformCreateSheet } from '../../helpers/transformers';
import sheetsPath from '../../config/endpoints';

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
      message.error('Sheet could not be created');
      throw new Error('Bad response from server');
    }
    yield put(sheetCreateSuccess());
    message.success('Sheet has been created');
    Router.push({
      pathname: '/sheets',
    });
  } catch (err) {
    yield put(sheetCreateError());
  }
}
