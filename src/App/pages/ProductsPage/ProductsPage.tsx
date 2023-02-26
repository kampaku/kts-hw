import { useEffect, useRef, useState } from "react";

import { Loader } from "@components/Loader";
import { Product } from "@config/types";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { Results } from "./components/Results";
import { Search } from "./components/Search";
import styles from "./ProductsPage.module.scss";

export const ProductsPage = () => {
  const [query, setQuery] = useState("");
  const [productList, setProductList] = useState<Product[]>([]);
  const dataChunk = useRef(40);

  const fetchMore = async () => {
    const res = await axios.get(
      `https://api.escuelajs.co/api/v1/products?offset=${
        dataChunk.current - 20
      }&limit=20`
    );
    setProductList((prev) => [...prev, ...res.data]);
    dataChunk.current += 20;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://api.escuelajs.co/api/v1/products?offset=0&limit=20"
      );
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
