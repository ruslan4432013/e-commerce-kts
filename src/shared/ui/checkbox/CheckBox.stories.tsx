import React from 'react';
import { CheckBox, CheckBoxProps } from './CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
  argTypes: {
    disabled: {
      mapping: {
        'true': true,
        'false': false,
        'undefined': undefined,
      },
      control: 'boolean'
    },
    checked: {
      mapping: {
        'true': true,
        'false': false,
        'undefined': undefined,
      },
      control: 'boolean'
    }
  }
};

export const Default = ({checked, ...props}: CheckBoxProps) => {
  const [value, setValue] = useState<boolean | undefined>(checked)
  return <CheckBox {...props} checked={value} onChange={setValue} />
};
