import { Card } from "@components/Card";
import { Product } from "@config/types";
import { useNavigate } from "react-router-dom";

import styles from "./Results.module.scss";

type ResultsProps = {
  list: Product[];
};
export const Results = ({ list }: ResultsProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.result__text}>
        <h3 className={styles.result__title}>Total Product</h3>
        <span className={styles.result__count}>{list.length}</span>
      </div>
      <div className={styles.result}>
        {list.map((value) => (
          <Card
            key={value.id}
            image={value.images[0]}
            title={value.title}
            subtitle={value.description}
            content={value.price}
            category={value.category.name}
            onClick={() => navigate(`/product/${value.id}`)}
          />
        ))}
      </div>
    </>
  );
};
