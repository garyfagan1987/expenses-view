import React from 'react';
import Head from 'next/head';

import messages from '../config/messages';

const message = messages.index;

const Index = () => (
  <React.Fragment>
    <Head>
      <title>{message.title}</title>
    </Head>
    <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
      <p>{message.heading}</p>
    </div>
  </React.Fragment>
);

export default Index;
