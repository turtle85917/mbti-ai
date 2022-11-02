import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./style/index.scss";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);