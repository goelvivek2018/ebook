/*
 *
 * BookDetailsPage actions
 *
 */

import { LOAD_BOOK_DETAILS, LOAD_BOOK_DETAILS_FAILURE, LOAD_BOOK_DETAILS_SUCCESS } from './constants';

export function getDetails(payload) {
  return {
    type: LOAD_BOOK_DETAILS,
    payload
  };
}

export function detailsLoaded(response) {
  return {
    type: LOAD_BOOK_DETAILS_SUCCESS,
    response
  };
}

export function getDetailsFailed(error) {
  return {
    type: LOAD_BOOK_DETAILS_FAILURE,
    error
  };
}
