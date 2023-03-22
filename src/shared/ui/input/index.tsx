import { InputHTMLAttributes, FC } from "react";

import cn from "classnames";

import s from "./styles.module.scss";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export const Input: FC<InputProps> = (props) => {
  const { className, value, onChange, disabled, ...other } = props;
  return (
    <input
      className={cn(className, s.input, "input", {
        [s.input_disabled]: disabled,
      })}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={"text"}
      {...other}
    />
  );
};
