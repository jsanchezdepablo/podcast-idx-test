import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStateProvider from "states";
import Layout from "layout";
import routes from "routes";

import "assets/styles/index.scss";

const Application = () => (
  <GlobalStateProvider>
    <Router>
      <Layout>{routes}</Layout>
    </Router>
  </GlobalStateProvider>
);

ReactDOM.render(<Application />, document.getElementById("root"));
