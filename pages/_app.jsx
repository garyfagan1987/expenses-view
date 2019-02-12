import { Provider } from 'react-redux';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import App, { Container } from 'next/app';
import compose from 'lodash/fp/compose';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';
import theme from '../themes/default';

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }
  body {
    background-color: lavender;
    font-family: Tahoma, Geneva, sans-serif;
    font-size: 1.6rem;
  }
  button {
    font-size: 1.6rem;
  }
  input {
    font-family: Tahoma, Geneva, sans-serif;
  }
`;

const Page = styled.div`
  background-color: #FFF;
  margin: 0 auto;
  padding: 20px;
  width: 500px;
`;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <GlobalStyle />
        <Container>
          <main>
            <ThemeProvider theme={theme}>
              <Page>
                <Component {...pageProps} />
              </Page>
            </ThemeProvider>
          </main>
        </Container>
      </Provider>
    );
  }
}

export default compose(
  withRedux(createStore),
  withReduxSaga({ async: true }),
)(MyApp);
