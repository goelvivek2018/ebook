/*
 *
 * BookDetailsPage reducer
 *
 */
import produce from 'immer';
import { LOAD_BOOK_DETAILS, LOAD_BOOK_DETAILS_FAILURE, LOAD_BOOK_DETAILS_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  response: {},
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const bookDetailsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_BOOK_DETAILS:
        draft.loading = true;
        draft.payload = action.payload;
        draft.error = false;
        break;
      case LOAD_BOOK_DETAILS_SUCCESS:
        draft.loading = false;
        draft.response[draft.payload.book] = action.response;
        draft.error = false;
        break;
      case LOAD_BOOK_DETAILS_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default bookDetailsPageReducer;
