import React, { Component } from 'react';
import Head from 'next/head';
import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';

import { sheetsFetch } from '../actions/sheets/sheets';
import SheetContainer from '../containers/sheets/sheets';


export default class Home extends Component {
  static async getInitialProps(ctx) {
    const { store: { dispatch } } = ctx;
    const cookies = ctx.isServer ? nextCookie(ctx) : Cookies.get();
    const { token } = cookies;
    dispatch(sheetsFetch(token));
    return { cookies };
  }

  render() {
    // @todo, not right to pass this into components...
    const { token } = this.props.cookies;
    return (
      <React.Fragment>
        <Head>
          <title>Expenses | Sheets</title>
        </Head>
        <SheetContainer token={token} />
      </React.Fragment>
    );
  }
}
