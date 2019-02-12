import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../ui', true, /.story.jsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);