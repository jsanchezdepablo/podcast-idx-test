import React from "react";
import Container from "@mui/material/Container";

import "./styles.scss";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <div className="layout__header">Podcaster</div>
      <div>{children}</div>
    </Container>
  );
};

export default Layout;
