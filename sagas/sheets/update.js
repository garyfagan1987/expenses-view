import { put } from 'redux-saga/effects';

import { sheetUpdateError, sheetUpdateSuccess } from '../../actions/sheet/update';
import headers from '../../config/headers';
import sheetsPath from '../../config/endpoints';

const transformUpdateData = data => ({
  date: data.date,
  isPublished: data.isPublished,
  title: data.title,
});

export default function* updateSheet(data) {
  try {
    const payload = transformUpdateData({ ...data.payload });
    const res = yield fetch(`${sheetsPath}/${data.payload._id}`, {
      ...headers,
      body: JSON.stringify(payload),
      method: 'PUT',
    });
    if (res.status !== 200) {
      throw new Error('Bad response from server');
    }
    yield put(sheetUpdateSuccess());
  } catch (err) {
    yield put(sheetUpdateError());
  }
}
