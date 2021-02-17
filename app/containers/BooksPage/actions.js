/*
 *
 * BooksPage actions
 *
 */

import { SEARCH_BOOKS, SEARCH_BOOKS_SUCCESS, SEARCH_BOOKS_FAILURE, SET_CURRENT_PAGE } from './constants';

export function searchBooks(payload) {
  return {
    type: SEARCH_BOOKS,
    payload
  };
}

export function booksSearched(response) {
  return {
    type: SEARCH_BOOKS_SUCCESS,
    response
  };
}

export function searchBooksFailed(error) {
  return {
    type: SEARCH_BOOKS_FAILURE,
    error
  };
}

export function searchCurrrentPageData(currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  };
}
