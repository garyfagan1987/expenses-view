import React from 'react';
import Head from 'next/head';

import CreateSheetContainer from '../containers/sheets/create';

export default () => (
  <React.Fragment>
    <Head>
      <title>Create sheet</title>
    </Head>
    <CreateSheetContainer />
  </React.Fragment>
);
