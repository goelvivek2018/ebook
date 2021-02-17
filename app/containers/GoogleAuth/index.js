/**
 *
 * GoogleAuth
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Button } from 'antd';

import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGoogleAuth from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {login} from './actions'

export function GoogleAuth({login, googleAuth}) {

  useInjectReducer({ key: 'googleAuth', reducer });
  useInjectSaga({ key: 'googleAuth', saga });
  function signIn(e) {
    if (e) {
      e.preventDefault()
    }
    login();
  }

  return (
    <div style={{margin: 'auto'}}>
      <Helmet>
        <title>GoogleAuth</title>
        <meta name="description" content="Description of GoogleAuth" />
      </Helmet>
      <Button type="primary" block  onClick={signIn} loading={googleAuth.loading}>
        Login With Google
      </Button>
    </div>
  );
}

GoogleAuth.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  googleAuth: makeSelectGoogleAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GoogleAuth);
