import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStateProvider from "states";
import Layout from "layout";
import routes from "routes";

import "assets/styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
const Application = () => (
  <GlobalStateProvider>
    <Router>
      <Layout>{routes}</Layout>
    </Router>
  </GlobalStateProvider>
);

root.render(<Application />);
