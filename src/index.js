import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ItemProvider } from "./context/context";

ReactDOM.render(
  <ItemProvider>
    <App />
  </ItemProvider>,
  document.getElementById("root")
);
