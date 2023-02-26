import React from "react";

import cn from "classnames";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({ value, onChange, ...props }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      {...props}
      type="text"
      className={cn(styles.input, props.className, {
        [styles.input_disabled]: props.disabled,
      })}
      value={value}
      onChange={handleOnChange}
    />
  );
};
