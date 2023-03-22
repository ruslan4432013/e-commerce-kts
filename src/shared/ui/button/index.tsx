import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

import cn from "classnames";

import s from "./styles.module.scss";
import { Loader, LoaderSize } from "../loader";

export type ButtonProps = PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = (props) => {
  const { loading, className, children, disabled, ...other } = props;
  return (
    <button
      className={cn(className, s.button, "button", {
        [s.button_disabled]: loading || disabled,
        [s.button_load]: loading,
      })}
      disabled={disabled || loading}
      {...other}
    >
      {loading && (
        <Loader className={s.loader} loading={loading} size={LoaderSize.s} />
      )}
      {children}
    </button>
  );
};
