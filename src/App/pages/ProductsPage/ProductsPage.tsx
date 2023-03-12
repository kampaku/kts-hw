import { useEffect, useRef } from "react";

import { Loader } from "@components/Loader";
import { ProductsStore } from "@store/ProductsStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

import { Results } from "./components/Results";
import { Search } from "./components/Search";
import styles from "./ProductsPage.module.scss";

export const ProductsPage = observer(() => {
  const productStore = useLocalStore(() => new ProductsStore());
  const firstRender = useRef(true);

  useEffect(() => {
    productStore.getProductList();

    return () => {
      firstRender.current = true;
    };
  }, []);

  return (
    <div className={"container"}>
      <div>
        <Search value={productStore.search} onSearch={productStore.setSearch} />
      </div>
      <div className={styles.page__results}>
        <InfiniteScroll
          hasChildren={true}
          next={() => {
            if (firstRender.current) {
              firstRender.current = false;
              return;
            }
            productStore.getProductList();
          }}
          hasMore={productStore.hasMore}
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
