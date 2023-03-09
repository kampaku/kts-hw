import { Card } from "@components/Card";
import { ProductModel } from "@store/models";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./Results.module.scss";

type ResultsProps = {
  list: ProductModel[];
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
            card={value}
            onClick={() => navigate(`/product/${value.id}`)}
          />
        ))}
      </div>
    </>
  );
};
