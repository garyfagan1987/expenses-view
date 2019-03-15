import React, { Component } from 'react';
import Head from 'next/head';
import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';

import CreateSheetContainer from '../containers/sheets/create';

export default class Home extends Component {
  static async getInitialProps(ctx) {
    const cookies = ctx.isServer ? nextCookie(ctx) : Cookies.get();
    return { cookies };
  }

  render() {
    const { token } = this.props.cookies;
    return (
      <React.Fragment>
        <Head>
          <title>Expenses | Create Sheet</title>
        </Head>
        <CreateSheetContainer token={token} />
      </React.Fragment>
    );
  }
}
