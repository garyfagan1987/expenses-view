import React, { Component } from 'react';
import Head from 'next/head';

import { sheetsFetch } from '../actions/sheets/sheets';
import SheetContainer from '../containers/sheets/sheets';

export default class Home extends Component {
  static async getInitialProps({ store: { dispatch } }) {
    dispatch(sheetsFetch());
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Sheets</title>
        </Head>
        <SheetContainer />
      </React.Fragment>
    );
  }
}
