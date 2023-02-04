import React from "react";
import Container from "@mui/material/Container";

import "./styles.scss";

const Layout = ({ children }) => (
  <Container maxWidth="lg">
    <div className="layout__header">Podcaster</div>
    <div className="layout__content">{children}</div>
  </Container>
);

export default Layout;
