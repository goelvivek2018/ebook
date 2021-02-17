/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Layout } from 'antd';

const { Header } = Layout;

import GoogleAuth from 'containers/GoogleAuth/Loadable';
import BooksPage from 'containers/BooksPage/Loadable';
import BookDetailsPage from 'containers/BookDetailsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {setUserSignedIn} from './actions';
import {makeSelectCurrentUser} from './selectors';

import GlobalStyle from '../../global-styles';
import { createStructuredSelector } from 'reselect';
import 'antd/dist/antd.css';
import { Content } from 'antd/lib/layout/layout';


const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 90vh;
  padding: 0 16px;
  flex-direction: column;
`;

function App({dispatch,currentUser}) {
  let history = useHistory();

  useEffect(()=>{
    if (currentUser)
      if (!location.pathname.includes("books"))
        history.push('/books')
  }, [currentUser])

  useEffect(()=> {
    gapi.load('auth2', async function(){
      await gapi.auth2.init({
      client_id: '948343241881-5hh2g2up35fo2hqis8bc8mv2rk64n0sf.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'email profile',
      fetch_basic_profile: false
      });
      if(gapi.auth2.getAuthInstance() && gapi.auth2.getAuthInstance().isSignedIn && gapi.auth2.getAuthInstance().isSignedIn.get()) {
        dispatch(setUserSignedIn());
        if (!location.pathname.includes("books"))
          history.push('/books')
      } else {
        history.push('/')
      }
    });
  }, [])

  return (
    <Layout>
      <Header style={{background: "#ffffff"}}></Header>
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Ebbok Library"
          defaultTitle="Ebbok Library"
        >
          <meta name="description" content="A Ebbok Library application" />
        </Helmet>
          <Content style={{minWidth: "50vw"}}>
          {/* <Header /> */}
            <Switch>
              {/* <Route exact path="/" component={HomePage} /> */}
              <Route exact path="/" component={GoogleAuth} />
              <Route path="/books/:kind/:bookid" component={BookDetailsPage} />
              <Route path="/books" component={BooksPage} />
              <Route path="" component={NotFoundPage} />
            </Switch>
            {/* <Footer /> */}
            <GlobalStyle />
          </Content>
        </AppWrapper>
      </Layout>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(App);
