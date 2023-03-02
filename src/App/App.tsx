import Header from "@components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import styles from "./App.module.scss";
import { ProductDetails } from "./pages/ProductDetails";
import { ProductsPage } from "./pages/ProductsPage";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<ProductsPage />} />
          <Route path={"/product/:id"} element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
