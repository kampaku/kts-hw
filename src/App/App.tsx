import Header from "@components/Header";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Route, Routes } from "react-router-dom";

import styles from "./App.module.scss";
import { ProductDetails } from "./pages/ProductDetails";
import { ProductsPage } from "./pages/ProductsPage";

function App() {
  useQueryParamsStoreInit();
  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route path={"/"} element={<ProductsPage />} />
        <Route path={"/product/:id"} element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
