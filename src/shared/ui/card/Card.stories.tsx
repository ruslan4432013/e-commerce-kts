import React from 'react';
import { Card, CardProps } from './Card';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    image: {
      defaultValue: '/logo512.png',
      control: 'text'
    },
    title: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text'
    },
    subtitle: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text'
    },
    content: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text'
    },
  },
};

export const Default = (props: CardProps) => (
    <Card {...props} />
);
