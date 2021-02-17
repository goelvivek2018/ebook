/**
 *
 * BookDetailsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {Row,Col,Card,Carousel, Tag, Typography, Spin,Divider} from 'antd'

import { useParams } from "react-router-dom";

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBookDetailsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {getDetails} from './actions'

const { Text,Title } = Typography;

export function BookDetailsPage({dispatch, bookDetailsPage}) {
  const { bookid, kind } = useParams();
  useInjectReducer({ key: 'bookDetailsPage', reducer });
  useInjectSaga({ key: 'bookDetailsPage', saga });
  useEffect(()=>{
    if (bookid)
      dispatch(getDetails({book: bookid, kind}))
  },[bookid])


  function onChange(a, b, c) {
    console.log(a, b, c);
  }
  const {title, description={}, covers=[], subject_people=[],subjects=[]} = bookDetailsPage.response[bookid] || {}

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    width: '100%'
  };
  return (
    <Card>
      
      <Spin spinning={bookDetailsPage.loading}>
        
        {covers && 
        <Carousel onChange={onChange} dotPosition="center">
            {covers.map(cover =>  <div key={cover}><img src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`} /></div>)}
        </Carousel>
        }
        <Row>
          <Col lg={11}>
            <Row>
            </Row>
            {subject_people.length ?
            <Row>
              <h2>Subject People</h2>
              {subject_people.map(cover =>  <Tag >{cover}</Tag>)}
            </Row>
            : null
            }
            {subjects.length ?
              <>
                <Row>
                  <h2>Subjects</h2>
                </Row>
                <Row>
                  {subjects.map(cover =>  <Tag >{cover}</Tag>)}
                </Row>
              </>
              :
              null
            }
          </Col>
          <Col lg={1}>
          </Col>
          <Col lg={12}>
            <Row>
              <Col>
                <Text type="secondary">{`An edition of (${title})`}</Text>
              </Col>
            </Row>
            <Row>
              <Title level={2}>{title}</Title>
            </Row>
            {description.value}
          </Col>
        </Row>
      </Spin>
    </Card>
  );
}

BookDetailsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bookDetailsPage: makeSelectBookDetailsPage(),
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
)(BookDetailsPage);
