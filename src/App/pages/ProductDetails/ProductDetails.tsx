import { useEffect, useState } from "react";

import { Card } from "@components/Card";
import { WithLoader } from "@components/WithLoader";
import { Product } from "@config/types";
import { urls } from "@config/urls";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { ProductInfo } from "./components/ProductInfo";
import styles from "./ProductDetails.module.scss";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>();
  const [relatedProduct, setRelatedProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const productRes = await axios.get(urls.product(id));
        setProduct(productRes.data);
      }
      const relatedRes = await axios.get(urls.products(0, 3));
      setRelatedProduct(relatedRes.data);
      setIsLoading(false);
    };
    fetch();
  }, [id]);
  return (
    <div className={`${styles.page} container`}>
      <div className={styles.page__info}>
        <WithLoader loading={isLoading}>
          {product && <ProductInfo product={product} />}
        </WithLoader>
      </div>
      <div className={styles.page__related}>
        <p className={styles["page__related-text"]}>Related Items</p>
        <div className={styles["page__related-cards"]}>
          {relatedProduct.map((product) => (
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
};
