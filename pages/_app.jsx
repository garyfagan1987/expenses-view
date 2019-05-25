import { Layout } from 'antd';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import compose from 'lodash/fp/compose';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';
import Navigation from '../components/navigation';

const { Header, Content, Footer } = Layout;

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Container>
          <Layout>
            <Header>
              <h1 style={{ color: '#FFF', float: 'left', margin: '0 20px 0 0' }}>
                Expenses
              </h1>
              <Navigation />
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
