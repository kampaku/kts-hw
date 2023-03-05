import { useEffect } from "react";

import { Card } from "@components/Card";
import { WithLoader } from "@components/WithLoader";
import { ProductDetailsStore } from "@store/ProductDetailsStore";
import { ProductsStore } from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

import { ProductInfo } from "./components/ProductInfo";
import styles from "./ProductDetails.module.scss";

export const ProductDetails = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const productDetailsStore = useLocalStore(() => new ProductDetailsStore());
  const productStore = useLocalStore(() => new ProductsStore());

  useEffect(() => {
    if (id) {
      productDetailsStore.getProduct(id);
      productStore.getProductList(0, 3);
    }
  }, [productDetailsStore, id, productStore]);

  return (
    <div className={`${styles.page} container`}>
      <div className={styles.page__info}>
        <WithLoader loading={productDetailsStore.meta === Meta.loading}>
          {productDetailsStore.product !== null && (
            <ProductInfo product={productDetailsStore.product} />
          )}
        </WithLoader>
      </div>
      <div className={styles.page__related}>
        <p className={styles["page__related-text"]}>Related Items</p>
        <div className={styles["page__related-cards"]}>
          {productStore.list.map((product) => (
            <Card
              key={product.id}
              card={product}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
