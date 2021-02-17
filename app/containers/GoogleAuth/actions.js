/*
 *
 * GoogleAuth actions
 *
 */

import { LOGIN_WITH_GOOGLE, LOGIN_WITH_GOOGLE_SUCCESS, LOGIN_WITH_GOOGLE_FAILED } from './constants';

export function login() {
  return {
    type: LOGIN_WITH_GOOGLE,
  };
}


export function logedIn(response) {
  return {
    type: LOGIN_WITH_GOOGLE_SUCCESS,
    response
  };
}


export function logedInFaiiled({error}) {
  return {
    type: LOGIN_WITH_GOOGLE_FAILED,
    error
  };
}
