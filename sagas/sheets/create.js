import { put } from 'redux-saga/effects';

import { sheetCreateError, sheetCreateSuccess } from '../../actions/sheets/create';
import headers from '../../config/headers';
import sheetsPath from '../../config/endpoints';

export default function* createSheet(data) {
  try {
    const transformData = { ...data.payload, isPublished: false };
    const res = yield fetch(sheetsPath, {
      ...headers,
      body: JSON.stringify(transformData),
      method: 'POST',
    });
    if (res.status !== 200) {
      throw new Error('Bad response from server');
    }
    yield put(sheetCreateSuccess());
  } catch (err) {
    yield put(sheetCreateError());
  }
}