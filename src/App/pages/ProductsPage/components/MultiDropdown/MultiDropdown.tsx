import React, { useState } from "react";

import cn from "classnames";

import styles from "./MultiDropdown.module.scss";

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
  pluralizeOptions: (value: Option[]) => string | JSX.Element;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  pluralizeOptions,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: Option) => {
    const elem = value.find((opt) => opt.key === option.key);
    if (elem) {
      onChange(value.filter((option) => option.key !== elem.key));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className={styles["multi-dropdown"]}>
      <div
        className={cn(styles["multi-dropdown__selected"], {
          [styles["multi-dropdown__selected_disabled"]]: disabled,
        })}
        onClick={handleOpen}
        tabIndex={disabled ? -1 : 0}
      >
        {pluralizeOptions(value)}
      </div>
      {isOpen && !disabled && (
        <ul className={styles["multi-dropdown__options"]}>
          {options.map((option) => (
            <li
              className={cn(styles["multi-dropdown__option"], {
                [styles["multi-dropdown__option_selected"]]: value.find(
                  (opt) => opt.key === option.key
                ),
              })}
              onClick={() => handleSelect(option)}
              key={option.key}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
