import { put } from 'redux-saga/effects';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { message } from 'antd';

import { userAuthenticateError, userAuthenticateSuccess } from '../../actions/user/authenticate';
import { authenticatePath } from '../../config/endpoints';
import messages from '../../config/messages';

export default function* userAuthenticate({ payload: values }) {
  try {
    const cookies = new Cookies();
    const response = yield fetch(authenticatePath, {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    if (response.status !== 200) {
      message.error(messages.login.error);
      throw new Error(messages.login.error);
    }
    const authenticateResponse = yield response.json();
    yield put(userAuthenticateSuccess());
    cookies.set('token', authenticateResponse.token, { path: '/' });
    message.success(messages.login.success);
    Router.push({
      pathname: '/reports',
    });
  } catch (err) {
    yield put(userAuthenticateError());
  }
}
