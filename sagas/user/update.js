import { put } from 'redux-saga/effects';
import getConfig from 'next/config';
import { message as antMessage } from 'antd';

import { userUpdateError, userUpdateSuccess } from '../../actions/user/update';
import { transformUpdateUser } from '../../helpers/transformers';
import { updateUserPath } from '../../config/endpoints';
import messages from '../../config/messages';

const { publicRuntimeConfig: { API_PATH } } = getConfig();
const message = messages.changeDetails;

export default function* updateSheet({ payload: { values, token } }) {
  try {
    const payload = transformUpdateUser({ ...values });
    // eslint-disable-next-line no-underscore-dangle
    const res = yield fetch(`${API_PATH}${updateUserPath}`, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      method: 'PUT',
    });
    if (res.status !== 200) {
      antMessage.error(message.error);
      throw new Error(message.error);
    }
    antMessage.success(message.success);
    yield put(userUpdateSuccess());
  } catch (err) {
    yield put(userUpdateError());
  }
}
