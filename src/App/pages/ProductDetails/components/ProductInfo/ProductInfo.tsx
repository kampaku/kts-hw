import { Button } from "@components/Button";
import { Product } from "@config/types";

import styles from "./ProductInfo.module.scss";

type ProductInfoProps = {
  product: Product;
};
export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className={styles.product}>
      <div className={styles.product__image}>
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className={styles.product__info}>
        <h1>{product.title}</h1>
        <p className={styles.product__description}>{product.description}</p>
        <p className={styles.product__price}>${product.price}</p>
        <div className={styles.product__buttons}>
          <Button>Buy Now</Button>
          <Button className={styles["product__cart-button"]}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
