/*
 *
 * BooksPage reducer
 *
 */
import produce from 'immer';
import { SEARCH_BOOKS, SEARCH_BOOKS_SUCCESS, SEARCH_BOOKS_FAILURE, SET_CURRENT_PAGE } from './constants';

export const initialState = {
  loading: false,
  response: false,
  error: false,
  currentPage: 0,
  currentPageData: [],
  payload: {
    q: "the lord"
  }
};

/* eslint-disable default-case, no-param-reassign */
const booksPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_BOOKS:
        draft.loading = true;
        draft.error = false;
        draft.payload = action.payload || draft.payload;
        draft.response = action.payload && action.payload.page ? draft.response : false;
        draft.currentPage = action.payload && action.payload.page ? draft.currentPage : 0;
        break;
      case SEARCH_BOOKS_SUCCESS:
        draft.loading = false;
        draft.response = draft.response ? {...draft.response, docs: [...draft.response.docs, ...action.response.docs]} : action.response;
        draft.currentPageData = draft.response.docs.slice(draft.currentPage*10, (draft.currentPage+1) * 10);
        draft.totalPages = Math.min(draft.response.docs.length/10 + 1, draft.response.num_found/10);
        draft.error = false;
        break;
      case SEARCH_BOOKS_FAILURE:
        draft.loading = false;
        draft.response = false;
        draft.error = action.response;
        break;
      case SET_CURRENT_PAGE:
        draft.currentPage = action.currentPage - 1;
        draft.currentPageData = draft.response.docs.slice(draft.currentPage*10, action.currentPage* 10);
        break;

    }
  });

export default booksPageReducer;
