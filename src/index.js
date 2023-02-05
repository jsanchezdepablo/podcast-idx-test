import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStateProvider from "states";
import Layout from "layout";
import routes from "routes";

import "assets/styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
const Application = () => (
  <GlobalStateProvider>
    <Layout>{routes}</Layout>
  </GlobalStateProvider>
);

root.render(<Application />);
