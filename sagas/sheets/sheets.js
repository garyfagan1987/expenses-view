import { put } from 'redux-saga/effects';

import { sheetsFetchError, sheetsFetchSuccess } from '../../actions/sheets/sheets';
import headers from '../../config/headers';
import sheetsPath from '../../config/endpoints';

export const transformSheets = sheets => (sheets).map(sheet => ({
  date: sheet.date,
  id: sheet._id,
  isPublished: sheet.isPublished,
  title: sheet.title,
}));

export default function* loadSheets() {
  try {
    const res = yield fetch(sheetsPath, {
      ...headers,
      method: 'GET',
    });
    const sheets = yield res.json();
    const payload = transformSheets(sheets);
    yield put(sheetsFetchSuccess(payload));
  } catch (err) {
    yield put(sheetsFetchError());
  }
}
