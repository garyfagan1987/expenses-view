import { put } from 'redux-saga/effects';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { message } from 'antd';

import { userAuthenticateError, userAuthenticateSuccess } from '../../actions/user/authenticate';
import { authenticatePath } from '../../config/endpoints';

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
      message.error('Unable to log in');
      throw new Error('Bad response from server');
    }
    const authenticateResponse = yield response.json();
    yield put(userAuthenticateSuccess());
    cookies.set('token', authenticateResponse.token, { path: '/' });
    message.success('Logged in');
    Router.push({
      pathname: '/reports',
    });
  } catch (err) {
    yield put(userAuthenticateError());
  }
}
