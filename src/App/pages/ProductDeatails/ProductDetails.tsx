import { useEffect, useState } from "react";

import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { WithLoader } from "@components/WithLoader";
import { Product } from "@config/types";
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
      const productRes = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      const relatedRes = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=0&limit=3`
      );
      setProduct(productRes.data);
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
              image={product.images[0]}
              title={product.title}
              subtitle={product.description}
              content={product.price}
              category={product.category.name}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
