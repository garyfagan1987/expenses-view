import { connect } from 'react-redux';
import React, { Component } from 'react';
import Head from 'next/head';

import Button from '../components/atoms/Button/Button';
import Flex from '../components/atoms/Flex/Flex';
import Margin from '../components/atoms/Margin/Margin';
import Text from '../components/atoms/Text/Text';

import { getSheet } from '../selectors/sheet';
import { sheetFetch } from '../actions/sheet/sheet';

class Sheet extends Component {
  static async getInitialProps({ query, store: { dispatch } }) {
    dispatch(sheetFetch(query.slug));
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Sheet</title>
        </Head>
        <React.Fragment>
          <Margin>
            <Flex justifyContent="space-between">
              <Text as="h2" bold>
                Sheet
              </Text>
              <Button as="a" href="/" secondary>
                Back
              </Button>
            </Flex>
          </Margin>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  sheet: getSheet(state),
});

export default connect(
  mapStateToProps,
  null,
)(Sheet);
