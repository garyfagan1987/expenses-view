import { put } from 'redux-saga/effects';

import { userAuthenticateError, userAuthenticateSuccess } from '../../actions/user/authenticate';
import { authenticatePath } from '../../config/endpoints';

export default function* userAuthenticate({ payload: values }) {
  try {
    const response = yield fetch(authenticatePath, {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    if (response.status !== 200) {
      throw new Error('Bad response from server');
    }
    const authenticateResponse = yield response.json();
    yield put(userAuthenticateSuccess(authenticateResponse));
  } catch (err) {
    yield put(userAuthenticateError());
  }
}
