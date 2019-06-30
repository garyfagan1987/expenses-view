import { put } from 'redux-saga/effects';
import { message } from 'antd';

import { userRegisterError } from '../../actions/user/register';
import { registerPath } from '../../config/endpoints';
import messages from '../../config/messages';
import userAuthenticate from './authenticate';

export default function* userRegister({ payload: values }) {
  try {
    const response = yield fetch(registerPath, {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    if (response.status !== 200) {
      message.error(messages.register.error);
      throw new Error(messages.register.error);
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
