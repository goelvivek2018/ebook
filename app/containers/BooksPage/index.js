/**
 *
 * BooksPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Input, Card, Row, Col, Spin, Divider, Pagination, Skeleton, Avatar} from 'antd';
import { Link } from 'react-router-dom'

const { Search } = Input;
const { Meta } = Card;

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBooksPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {searchBooks,searchCurrrentPageData} from './actions'
import messages from './messages';

export function BooksPage({dispatch, booksPage}) {
  useInjectReducer({ key: 'booksPage', reducer });
  useInjectSaga({ key: 'booksPage', saga });
  const {loading, response, currentPageData, payload, currentPage, totalPages} = booksPage
  useEffect(() => {
    handleSearchBooks()
  },[])

  useEffect(() => {
    if(response && !currentPageData.length) {
      handleSearchBooks({...payload, page: parseInt((currentPage)/10)+1})
    }
  }, [currentPage])


  const handleSearchBooks = (data) => {
    dispatch(searchBooks(data))
  }
  return (
    <div>
      <Helmet>
        <title>BooksPage</title>
        <meta name="description" content="Description of BooksPage" />
      </Helmet>
      <Search placeholder="Search by title" defaultValue={payload.q} enterButton onChange={(e) =>handleSearchBooks({q:e.target.value})} />
      <Divider />
      <Spin spinning={loading}>
        <Row gutter={16}>
          {loading &&  Array(10).fill('').map(item => {
            return(
              <Card
                style={{ width: 240 }}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Card title"
                    description="This is the description"
                  />
                </Skeleton>
              </Card>
            )
          })}
          {currentPageData && currentPageData.map(doc => {
            return(
              <Col>
                <Link to={`/books${doc.key}`}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" height="200" src={doc.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}.jpg` : 'https://openlibrary.org/images/icons/avatar_book-sm.png'} />}
                  >
                    <Meta title={doc.title} description={doc.title_suggest} />
                  </Card>
                </Link>
                </Col>
            )
          })}
        </Row>
        <Divider />
        <Row>
          <Pagination defaultCurrent={1} total={totalPages*10} onChange={(page) => dispatch(searchCurrrentPageData(page))} />
        </Row>
      </Spin>

    </div>
  );
}

BooksPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  booksPage: makeSelectBooksPage(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(BooksPage);
