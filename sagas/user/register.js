import { put } from 'redux-saga/effects';
import { message } from 'antd';

import { userRegisterError, userRegisterSuccess } from '../../actions/user/register';
import { registerPath } from '../../config/endpoints';
import messages from '../../config/messages';

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
    message.success(messages.register.success);
    yield put(userRegisterSuccess());
  } catch (err) {
    yield put(userRegisterError());
  }
}
