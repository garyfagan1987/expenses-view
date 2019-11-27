import { put } from 'redux-saga/effects';
import getConfig from 'next/config';

import { userFetchError, userFetchSuccess } from '../../actions/user/user';
import { getUserPath } from '../../config/endpoints';

const { publicRuntimeConfig: { API_PATH } } = getConfig();

export default function* getUser({ payload }) {
  try {
    const response = yield fetch(`${API_PATH}${getUserPath}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': payload,
      },
      method: 'GET',
    });
    const user = yield response.json();
    yield put(userFetchSuccess(user));
  } catch (err) {
    yield put(userFetchError());
  }
}
