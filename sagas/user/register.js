import { put } from 'redux-saga/effects';
import getConfig from 'next/config';
import { message as antMessage } from 'antd';

import { userRegisterError } from '../../actions/user/register';
import { registerPath } from '../../config/endpoints';
import messages from '../../config/messages';
import userAuthenticate from './authenticate';

const { publicRuntimeConfig: { API_PATH } } = getConfig();
const message = messages.register;

export default function* userRegister({ payload: values }) {
  try {
    const response = yield fetch(`${API_PATH}${registerPath}`, {
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
    yield* (userAuthenticate({
      payload: {
        email: values.email,
        password: values.password,
      },
    }));
  } catch (err) {
    yield put(userRegisterError());
  }
}
