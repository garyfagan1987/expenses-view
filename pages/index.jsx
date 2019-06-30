import React from 'react';
import Head from 'next/head';

import messages from '../config/messages';

const Index = () => (
  <React.Fragment>
    <Head>
      <title>{messages.index.title}</title>
    </Head>
    <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
      <p>{messages.index.heading}</p>
    </div>
  </React.Fragment>
);

export default Index;
