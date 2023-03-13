import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "regenerator-runtime";

import "@styles/index.scss";
import App from "./App";

import "./config/configureMobX";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
