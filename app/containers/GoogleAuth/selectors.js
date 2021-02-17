import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the googleAuth state domain
 */

const selectGoogleAuthDomain = state => state.googleAuth || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GoogleAuth
 */

const makeSelectGoogleAuth = () =>
  createSelector(
    selectGoogleAuthDomain,
    substate => substate,
  );

export default makeSelectGoogleAuth;
export { selectGoogleAuthDomain };
