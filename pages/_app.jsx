import { Layout, Menu } from 'antd';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Link from 'next/link';
import compose from 'lodash/fp/compose';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';

const { Header, Content, Footer } = Layout;

class MyApp extends App {
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
                <Menu.Item key="2">
                  <Link href="/login">
                    <a>Log in</a>
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
