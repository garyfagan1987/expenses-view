import { Layout } from 'antd';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Link from 'next/link';
import compose from 'lodash/fp/compose';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';
import Navigation from '../components/navigation';
import { indexPath } from '../config/paths';
import messages from '../config/messages';

const { Header, Content } = Layout;

const message = messages.navigation;

class ExpensesApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Container>
          <Layout style={{ height: '100vh' }}>
            <Header>
              <h1 style={{ float: 'left', margin: '0 20px 0 0' }}>
                <Link href={indexPath}>
                  <a style={{ color: '#FFF' }}>{message.primary}</a>
                </Link>
              </h1>
              <Navigation />
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <main>
                <Component {...pageProps} />
              </main>
            </Content>
          </Layout>
        </Container>
      </Provider>
    );
  }
}

export default compose(
  withRedux(createStore),
  withReduxSaga({ async: true }),
)(ExpensesApp);
