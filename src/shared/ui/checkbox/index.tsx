import { FC, InputHTMLAttributes } from "react";

import cn from "classnames";

import s from "./styles.module.scss";

export type CheckBoxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox: FC<CheckBoxProps> = ({ onChange, ...props }) => (
  <label className={cn(s.checkbox)}>
    <input
      type="checkbox"
      {...props}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className={cn(s.checkmark, "checkbox")} />
  </label>
);
