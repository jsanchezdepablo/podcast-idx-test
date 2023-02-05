import React from "react";
import Box from "@mui/material/Box";
import { Switch, Route } from "react-router-dom";
import podcastsRoutes from "scenes/podcasts/routes";

const routes = (
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
);

export default routes;
