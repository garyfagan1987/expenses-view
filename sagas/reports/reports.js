import { put } from 'redux-saga/effects';
import getConfig from 'next/config';

import { sheetsFetchError, sheetsFetchSuccess } from '../../actions/reports/reports';
import { transformSheets } from '../../helpers/transformers';
import sheetsPath from '../../config/endpoints';

const { publicRuntimeConfig: { API_PATH } } = getConfig();

export default function* loadSheets({ payload }) {
  try {
    const response = yield fetch(`${API_PATH}${sheetsPath}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': payload,
      },
      method: 'GET',
    });
    const reports = yield response.json();
    const successPayload = transformSheets(reports);
    yield put(sheetsFetchSuccess(successPayload));
  } catch (err) {
    yield put(sheetsFetchError());
  }
}
