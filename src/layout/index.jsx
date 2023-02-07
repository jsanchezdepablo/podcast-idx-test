import React from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { usePodcastsSelector } from "states/podcasts";

import "./styles.scss";

const Layout = ({ children }) => {
  const {
    state: { isFirstStart },
  } = usePodcastsSelector();

  return (
    <Container maxWidth="lg">
      <div className="layout__header">
        <Link to="/" className="layout__header-link">
          <div className="layout__header-title">Podcaster</div>
        </Link>
        {isFirstStart && <div className="layout__header-indicator" />}
      </div>
      <div className="layout__content">{children}</div>
    </Container>
  );
};

export default Layout;
