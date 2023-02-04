import React, { lazy } from "react";
import { Route } from "react-router-dom";
import SuspenseWrapper from "components/suspense-wrapper";

const PodcastsView = lazy(() => import("."));
const DetailView = lazy(() => import("./components/detail"));
const EpisodeView = lazy(() => import("./components/episode"));

const PODCASTS = {
  PATH: "/",
  DETAIL_PATH: "/podcast/:id",
  EPISODE_PATH: "/podcast/:id/episode/:id",
};

const podcastsRoutes = [
  <Route key="detail" exact path={PODCASTS.DETAIL_PATH}>
    {SuspenseWrapper(DetailView)}
  </Route>,
  <Route key="episode" exact path={PODCASTS.EPISODE_PATH}>
    {SuspenseWrapper(EpisodeView)}
  </Route>,
  <Route key="podcasts" exact path={PODCASTS.PATH}>
    {SuspenseWrapper(PodcastsView)}
  </Route>,
];

export default podcastsRoutes;
