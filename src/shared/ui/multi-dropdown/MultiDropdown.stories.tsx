import React from 'react';
import { MultiDropdown, MultiDropdownProps, Option } from './MultiDropdown';

const OPTIONS = [
  { key: 'msk', value: 'Moscow' },
  { key: 'spb', value: 'Saint Petersburg' },
  { key: 'ekb', value: 'Ekaterinburg' },
];

export default {
  title: 'MultiDropdown',
  component: MultiDropdown,
  argTypes: {
    value: {
      mapping: String,
      control: "object",
    },
    disabled: {
      mapping: {
        'true': true,
        'false': false,
        'undefined': undefined,
      },
      control: 'boolean'
    }
  },
};

export const Default = (props: MultiDropdownProps) => {
  const [value, setValue] = useState<Option[]>(Array.isArray(props.value) ? props.value : []);

  return (
    <MultiDropdown
      disabled={props.disabled}
      options={OPTIONS}
      onChange={setValue}
      value={value}
      pluralizeOptions={(values: Option[]) => values.length === 0 ? 'Выберите город': `Выбрано: ${values.length}`}
  />
  );
};
