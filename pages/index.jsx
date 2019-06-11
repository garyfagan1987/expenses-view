import React from 'react';
import Head from 'next/head';

const IndexPage = () => (
  <React.Fragment>
    <Head>
      <title>Expenses</title>
    </Head>
    <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
      <p>Welcome to expenses app</p>
    </div>
  </React.Fragment>
);

export default IndexPage;
