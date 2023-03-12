import React from "react";

import { ProductModel } from "@store/models";

import styles from "./Card.module.scss";

export type CardProps = {
  card: ProductModel;
  onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const { images, category, price, title, description } = card;
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles["card__image-container"]}>
        <img src={images[0]} className={styles.card__image} alt={title} />
      </div>
      <div className={styles.card__description}>
        {category && (
          <span className={styles.card__category}>{category.name}</span>
        )}
        <h3 className={styles.card__title}>{title}</h3>
        <h6 className={styles.card__subtitle}>{description}</h6>
        {price && <p className={styles.card__content}>${price}</p>}
      </div>
    </div>
  );
};
