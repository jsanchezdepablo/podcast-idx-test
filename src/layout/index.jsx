import React from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

import "./styles.scss";

const Layout = ({ children }) => (
  <Container maxWidth="lg">
    <Link to="/" className="layout__link">
      <div className="layout__header">Podcaster</div>
    </Link>
    <div className="layout__content">{children}</div>
  </Container>
);

export default Layout;
