import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bookDetailsPage state domain
 */

const selectBookDetailsPageDomain = state =>
  state.bookDetailsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookDetailsPage
 */

const makeSelectBookDetailsPage = () =>
  createSelector(
    selectBookDetailsPageDomain,
    substate => substate,
  );

export default makeSelectBookDetailsPage;
export { selectBookDetailsPageDomain };
