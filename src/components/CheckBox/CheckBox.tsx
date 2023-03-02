import React, { useState } from "react";

import styles from "./CheckBox.module.scss";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...props }) => {
  const [checked, setChecked] = useState(props.checked);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
    setChecked(e.target.checked);
  };
  return (
    <label className={styles.checkbox}>
      <input
        {...props}
        className={styles.checkbox__input}
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
      />
      <span className={styles.checkbox__box} />
    </label>
  );
};
