import React from 'react';

import { Loader, LoaderProps } from './Loader';

export default {
  title: 'Loader',
  component: Loader,
  argTypes: {
    size: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text'
    },
    loading: {
      mapping: {
        'true': true,
        'false': false,
        'undefined': undefined,
      },
      control: 'boolean'
    }
  },
};

export const Default = (props: LoaderProps) => (
  <Loader {...props}/>
);
