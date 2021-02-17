import { put, takeLatest, call } from 'redux-saga/effects';
import { LOGIN_WITH_GOOGLE } from './constants';
import { logedIn, logedInFaiiled } from './actions';

export function* logIn() {
  try {
    const GoogleAuth = window.gapi.auth2.getAuthInstance()
    const res = yield call(GoogleAuth.signIn)
    yield put(logedIn({isSignedIn: res.isSignedIn, email: res.getBasicProfile().getEmail()}))
  } catch (err) {
    yield put(logedInFaiiled(err));
  }
}

export default function* googleAuthSaga() {
  yield takeLatest(LOGIN_WITH_GOOGLE, logIn);
}
