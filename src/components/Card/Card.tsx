import React from "react";

import styles from "./Card.module.scss";

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  category?: string;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
  category,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles["card__image-container"]}>
        <img src={image} className={styles.card__image} alt={image} />
      </div>
      <div className={styles.card__description}>
        {category && <span className={styles.card__category}>{category}</span>}
        <h3 className={styles.card__title}>{title}</h3>
        <h6 className={styles.card__subtitle}>{subtitle}</h6>
        {content && <p className={styles.card__content}>${content}</p>}
      </div>
    </div>
  );
};
