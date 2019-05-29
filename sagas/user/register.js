import { put } from 'redux-saga/effects';

import { userRegisterError, userRegisterSuccess } from '../../actions/user/register';
import { registerPath } from '../../config/endpoints';

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
      throw new Error('Bad response from server');
    }
    yield put(userRegisterSuccess());
  } catch (err) {
    yield put(userRegisterError());
  }
}
