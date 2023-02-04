import React from "react";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import podcastsRoutes from "scenes/podcasts/routes";

const routes = (
  <Router>
    <Switch>
      {podcastsRoutes}
      <Route
        path="*"
        key="not-found"
        render={() => (
          <Box>
            <h2>Ruta no encontrada</h2>
          </Box>
        )}
      />
    </Switch>
  </Router>
);

export default routes;
