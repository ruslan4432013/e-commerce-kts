import React from 'react'

import { WithLoader, WithLoaderProps } from './WithLoader'

export default {
  title: 'WithLoader',
  component: WithLoader,
  args: {
    children: ''
  },
  argTypes: {
    loading: {
      mapping: {
        'true': true,
        'false': false,
        'undefined': undefined,
      },
      control: 'boolean'
    }
  }
}

export const Default = (props: WithLoaderProps) => (
  <WithLoader {...props} />
)
