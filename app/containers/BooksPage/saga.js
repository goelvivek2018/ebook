import { call, put, select, takeLatest, debounce } from 'redux-saga/effects';
import { SEARCH_BOOKS } from './constants';
import { booksSearched, searchBooksFailed } from './actions';
import makeSelectBooksPage from './selectors'

import {serialize} from 'utils/helper';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* searcBooks() {

  const {payload} = yield select(makeSelectBooksPage())
  // Select username from store
  const requestURL = `https://openlibrary.org/search.json?${serialize(payload)}`
  try {
    // Call our request helper (see 'utils/request')
    const rresponse = yield call(request, requestURL);
    yield put(booksSearched(rresponse));
  } catch (err) {
    yield put(searchBooksFailed(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* booksPageSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield debounce(1000,SEARCH_BOOKS, searcBooks);
}
