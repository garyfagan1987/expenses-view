import { Layout, Menu } from 'antd';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Link from 'next/link';
import compose from 'lodash/fp/compose';
import React from 'react';
import nookies from 'nookies';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';

const { Header, Content, Footer } = Layout;

// @todo, this token needs to be set when authenticated
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzNhMzJjNzhmYjJkNTQ5MzFjNjhmZmEiLCJlbWFpbCI6ImdhcnlmYWdhbjE5ODdAZ29vZ2xlbWFpbC5jb20iLCJuYW1lIjoiR2FyeSBGYWdhbiIsImlhdCI6MTU1MjY2ODgwMn0.Vwp_KM2RYLroJ9aSWVOCBYkRSfaqBEVfRHWx0LPi3kw';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    nookies.set(ctx, 'token', token, {
      maxAge: 100,
      path: '/',
    });

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Container>
          <Layout>
            <Header>
              <h1 style={{ float: 'left', margin: '0 20px 0 0' }}>
                <Link href="/">
                  <a style={{ color: '#FFF' }}>Expensr</a>
                </Link>
              </h1>
              <Menu
                mode="horizontal"
                style={{ lineHeight: '64px' }}
                theme="dark"
              >
                <Menu.Item key="1">
                  <Link href="/create">
                    <a>Create sheet</a>
                  </Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <main>
                <Component {...pageProps} />
              </main>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Expensr ©2019 Created by Gary Fagan
            </Footer>
          </Layout>
        </Container>
      </Provider>
    );
  }
}

export default compose(
  withRedux(createStore),
  withReduxSaga({ async: true }),
)(MyApp);
