import React from 'react';
import Head from 'next/head';

import CreateSheetContainer from '../containers/sheets/create';

export default () => (
  <React.Fragment>
    <Head>
      <title>Expenses | Create Sheet</title>
    </Head>
    <CreateSheetContainer />
  </React.Fragment>
);
