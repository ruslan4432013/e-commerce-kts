import React, { useState, type MouseEvent } from 'react'
import cn from 'classnames'
import s from './MultiDropdown.module.scss'


export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

const getDropdownMenuHeight = (optionHeight: number, optionLength: number) => optionHeight * optionLength - 9

export const MultiDropdown: FC<MultiDropdownProps> = (props) => {
  const { disabled, onChange, options, value, pluralizeOptions } = props
  const [isOpen, setIsOpen] = useState(false)
  const dropdownMenuStyle = {
    height: isOpen && !disabled ? getDropdownMenuHeight(50, options.length) : 0
  }

  const handleDropdownClick = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleOptionClick = (option: Option) => () => {
    const newValue = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option];
    onChange(newValue);
  };
  return (
    <div className={cn(s['multi-dropdown'], 'multi-dropdown')}>
      <button
        className={cn(s.dropdown_toggle, {
          [s.focused]: isOpen
        })}
        id="multiDropdownMenuButton"
        type="button"
        disabled={disabled}
        onClick={handleDropdownClick}
      >
        {pluralizeOptions(value)}
      </button>
      {isOpen && !disabled &&
          <ul
              style={dropdownMenuStyle}
              className={s.dropdown_menu}
              role={'menuitem'}
              aria-expanded="false"
              aria-labelledby="multiDropdownMenuButton"
          >
            {options.map((option) => (
              <li
                key={option.key}
                onClick={handleOptionClick(option)}
                className={cn(s.dropdown_menu_item, {
                  [s.dropdown_menu_item__active]: value.includes(option)
                })}
              >
                {option.value}
              </li>
            ))}
          </ul>
      }
    </div>

  )
}
