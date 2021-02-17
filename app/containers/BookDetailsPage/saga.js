import { call, put, select, takeLatest, debounce } from 'redux-saga/effects';
import { LOAD_BOOK_DETAILS } from './constants';
import { detailsLoaded, getDetailsFailed } from './actions';
import makeSelectBookDetailsPage from './selectors'

import {serialize} from 'utils/helper';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* searcBooks() {

  const {payload: {book,kind}} = yield select(makeSelectBookDetailsPage())
  // Select username from store
  const requestURL = `https://openlibrary.org/${kind}/${book}.json`
  try {
    // Call our request helper (see 'utils/request')
    const rresponse = yield call(request, requestURL);
    yield put(detailsLoaded(rresponse));
  } catch (err) {
    yield put(getDetailsFailed(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* bookDetailsPageSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield debounce(1000,LOAD_BOOK_DETAILS, searcBooks);
}
