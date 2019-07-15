import { put } from 'redux-saga/effects';
import Router from 'next/router';
import getConfig from 'next/config';
import Cookies from 'universal-cookie';
import { message as antMessage } from 'antd';

import { userAuthenticateError, userAuthenticateSuccess } from '../../actions/user/authenticate';
import { authenticatePath } from '../../config/endpoints';
import messages from '../../config/messages';

const { publicRuntimeConfig: { API_PATH } } = getConfig();
const message = messages.login;

export default function* userAuthenticate({ payload: values }) {
  try {
    const cookies = new Cookies();
    const response = yield fetch(`${API_PATH}${authenticatePath}`, {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    if (response.status !== 200) {
      antMessage.error(message.error);
      throw new Error(message.error);
    }
    const authenticateResponse = yield response.json();
    yield put(userAuthenticateSuccess());
    cookies.set('token', authenticateResponse.token, { path: '/' });
    antMessage.success(message.success);
    Router.push({
      pathname: '/reports',
    });
  } catch (err) {
    yield put(userAuthenticateError());
  }
}
