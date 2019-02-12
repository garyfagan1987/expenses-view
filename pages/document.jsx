import Document, { Main, NextScript } from 'next/document';
import React from 'react';
import flush from 'styled-jsx/server';

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = flush();
    return { ...initialProps, styles };
  }

  render() {
    return (
      <html lang="en">
        <head>
          { this.props.styles }
        </head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
