import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App";
import enableMock from "./mock";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

enableMock();

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);
