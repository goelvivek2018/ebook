/*
 *
 * GoogleAuth reducer
 *
 */
import produce from 'immer';
import { LOGIN_WITH_GOOGLE, LOGIN_WITH_GOOGLE_SUCCESS, LOGIN_WITH_GOOGLE_FAILED } from './constants';

export const initialState = {
  loading: false,
  response: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const googleAuthReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_WITH_GOOGLE:
        draft.loading = true;
        draft.response = false;
        draft.error = false;
        break;
      case LOGIN_WITH_GOOGLE_SUCCESS:
        draft.loading = false;
        draft.response = action.response;
        draft.error = false;
        break;
      case LOGIN_WITH_GOOGLE_FAILED:
        draft.loading = false;
        draft.response = false;
        draft.error = action.error;
        break;
    }
  });

export default googleAuthReducer;
