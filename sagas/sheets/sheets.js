import { put } from 'redux-saga/effects';

import { sheetsFetchError, sheetsFetchSuccess } from '../../actions/sheets/sheets';
import { transformSheets } from '../../helpers/transformers';
import sheetsPath from '../../config/endpoints';

export default function* loadSheets({ payload }) {
  try {
    const response = yield fetch(sheetsPath, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': payload,
      },
      method: 'GET',
    });
    const sheets = yield response.json();
    const successPayload = transformSheets(sheets);
    yield put(sheetsFetchSuccess(successPayload));
  } catch (err) {
    yield put(sheetsFetchError());
  }
}
