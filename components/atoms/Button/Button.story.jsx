import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import {
  boolean, select, text, withKnobs,
} from '@storybook/addon-knobs';
import React from 'react';

import defaultTheme from '../../../themes/default';
import facebookTheme from '../../../themes/facebook';
import Button from './Button';

const stories = storiesOf('Form', module);

stories.addDecorator(withKnobs);

const themeOptions = {
  Default: defaultTheme,
  Facebook: facebookTheme,
};

stories.add('Button', () => (
  <ThemeProvider theme={select('Theme', themeOptions, defaultTheme)}>
    <Button
      disabled={boolean('Disabled', false)}
      fullWidth={boolean('Full width', false)}
      secondary={boolean('Secondary', false)}
    >
      {text('Text', 'Button')}
    </Button>
  </ThemeProvider>
));
