import { Button } from "@components/Button";

import filter from "./filter.svg";
import magnifier from "./magnifier.svg";
import styles from "./Search.module.scss";
import { Input } from "../Input";
import { MultiDropdown } from "../MultiDropdown";

type SearchProps = {
  value: string;
  onSearch: (query: string) => void;
};
export const Search = ({ value, onSearch }: SearchProps) => {
  const handleChange = (value: string) => {
    onSearch(value);
  };
  return (
    <div className={styles.search}>
      <div className={styles.search__text}>
        <h1 className={styles.search__title}>Products</h1>
        <p className={styles.search__description}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </p>
      </div>
      <div className={styles.search__panel}>
        <div className={styles.search__bar}>
          <img
            className={styles.search__magnifier}
            src={magnifier}
            alt="magnifier"
          />
          <Input
            className={styles.search__input}
            value={value}
            onChange={handleChange}
            placeholder={"Search property"}
          />
          <Button className={styles["search__button"]} loading={false}>
            Find Now
          </Button>
        </div>
        <MultiDropdown
          options={[]}
          value={[]}
          onChange={() => {}}
          pluralizeOptions={() => (
            <span className={styles.search__filter}>
              <img src={filter} alt="filter" />
              Filter
            </span>
          )}
        />
      </div>
    </div>
  );
};
