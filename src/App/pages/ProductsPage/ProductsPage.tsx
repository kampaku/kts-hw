import { useEffect, useState } from "react";

import { Loader } from "@components/Loader";
import { Product } from "@config/types";
import { urls } from "@config/urls";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { Results } from "./components/Results";
import { Search } from "./components/Search";
import styles from "./ProductsPage.module.scss";

export const ProductsPage = () => {
  const [query, setQuery] = useState("");
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchMore = async () => {
    const res = await axios.get(urls.products(productList.length));
    setProductList((prev) => [...prev, ...res.data]);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(urls.products(0));
      setProductList(res.data);
    };
    fetch();
  }, []);
  return (
    <div className={"container"}>
      <Search value={query} onSearch={setQuery} />
      <div className={styles.page__results}>
        <InfiniteScroll
          hasChildren={true}
          next={fetchMore}
          hasMore={true}
          loader={
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Loader />
            </div>
          }
          dataLength={productList.length}
        >
          <Results list={productList} />
        </InfiniteScroll>
      </div>
    </div>
  );
};
