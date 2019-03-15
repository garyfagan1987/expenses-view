import React, { Component } from 'react';
import Head from 'next/head';
import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';

import { sheetFetch } from '../actions/sheet/sheet';
import UpdateSheetContainer from '../containers/sheets/update';

export default class Home extends Component {
  static async getInitialProps(ctx) {
    const { query, store: { dispatch } } = ctx;
    const cookies = ctx.isServer ? nextCookie(ctx) : Cookies.get();
    const { token } = cookies;
    dispatch(sheetFetch(query.slug, token));
    return { cookies };
  }

  render() {
    const { token } = this.props.cookies;
    return (
      <React.Fragment>
        <Head>
          <title>Expenses | Update Sheet</title>
        </Head>
        <UpdateSheetContainer token={token} />
      </React.Fragment>
    );
  }
}
