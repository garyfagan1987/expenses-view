import React, { Component } from 'react';
import Head from 'next/head';

import { sheetFetch } from '../actions/sheet/sheet';
import UpdateSheetContainer from '../containers/sheets/update';

export default class Home extends Component {
  static async getInitialProps({ query, store: { dispatch } }) {
    dispatch(sheetFetch(query.slug));
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Sheets</title>
        </Head>
        <UpdateSheetContainer />
      </React.Fragment>
    );
  }
}
