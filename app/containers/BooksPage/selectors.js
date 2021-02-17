import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the booksPage state domain
 */

const selectBooksPageDomain = state => state.booksPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BooksPage
 */

const makeSelectBooksPage = () =>
  createSelector(
    selectBooksPageDomain,
    substate => substate,
  );

export default makeSelectBooksPage;
export { selectBooksPageDomain };
