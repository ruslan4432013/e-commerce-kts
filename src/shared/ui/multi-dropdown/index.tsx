import { FC, useState } from "react";

import cn from "classnames";

import s from "./styles.module.scss";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string | number;
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

const getDropdownMenuHeight = (optionHeight: number, optionLength: number) =>
  optionHeight * optionLength - 9;

export const MultiDropdown: FC<MultiDropdownProps> = (props) => {
  const { disabled, onChange, options, value, pluralizeOptions } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownMenuStyle = {
    height: isOpen && !disabled ? getDropdownMenuHeight(50, options.length) : 0,
    border: "none",
  };

  const keySet = new Set(value.map((val) => val.key));

  const handleDropdownClick = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleOptionClick = (option: Option) => () => {
    const newValue = keySet.has(option.key)
      ? value.filter((v) => !keySet.has(v.key))
      : [...value, option];
    onChange(newValue);
  };

  return (
    <>
      <div
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
        className={cn(s.multi_dropdown, "multi-dropdown")}
      >
        <button
          className={cn(s.dropdown_toggle, {
            [s.focused]: isOpen,
          })}
          id="multiDropdownMenuButton"
          type="button"
          disabled={disabled}
          onClick={handleDropdownClick}
        >
          {pluralizeOptions(value)}
        </button>
        <ul
          style={dropdownMenuStyle}
          className={s.dropdown_menu}
          role={"menuitem"}
          aria-expanded="false"
          aria-labelledby="multiDropdownMenuButton"
        >
          {options.map((option) => (
            <li
              key={option.key}
              onClick={handleOptionClick(option)}
              className={cn(s.dropdown_menu_item, {
                [s.dropdown_menu_item__active]: keySet.has(option.key),
              })}
            >
              {option.value}
            </li>
          ))}
        </ul>
        {isOpen && (
          <div className={s.backdrop} onClick={() => setIsOpen(false)} />
        )}
      </div>
    </>
  );
};
