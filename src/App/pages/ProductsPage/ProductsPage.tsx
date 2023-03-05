import { useEffect, useState } from "react";

import { Loader } from "@components/Loader";
import { ProductsStore } from "@store/ProductsStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

import { Results } from "./components/Results";
import { Search } from "./components/Search";
import styles from "./ProductsPage.module.scss";

export const ProductsPage = observer(() => {
  useQueryParamsStoreInit();
  const productStore = useLocalStore(() => new ProductsStore());
  let [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ search: query });
  };

  useEffect(() => {
    productStore.getProductList();
  }, [productStore]);

  return (
    <div className={"container"}>
      <form onSubmit={handleSubmit}>
        <Search value={query} onSearch={setQuery} />
      </form>
      <div className={styles.page__results}>
        <InfiniteScroll
          hasChildren={true}
          next={productStore.getProductList}
          hasMore={true}
          loader={
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Loader />
            </div>
          }
          dataLength={productStore.list.length}
        >
          <Results list={productStore.list} />
        </InfiniteScroll>
      </div>
    </div>
  );
});
