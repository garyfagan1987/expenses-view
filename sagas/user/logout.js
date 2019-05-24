import { put } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import Router from 'next/router';

import { userLogoutError, userLogoutSuccess } from '../../actions/user/logout';

export default function* userAuthenticate() {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get('token');
  if (isLoggedIn) {
    cookies.remove('token');
    Router.push({
      pathname: '/',
    });
    yield put(userLogoutSuccess());
  } else {
    yield put(userLogoutError());
  }
}
