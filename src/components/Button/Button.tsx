import React from "react";

import cn from "classnames";

import styles from "./Button.module.scss";
import { Loader, LoaderSize } from "../Loader";

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <button
      disabled={loading === true}
      {...props}
      className={cn(styles.button, props.className, {
        [styles.button_loading]: loading === true,
        [styles.button_disabled]: props.disabled || loading === true,
      })}
    >
      {loading ? (
        <>
          <Loader size={LoaderSize.s} className={styles.button__loader} />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};
