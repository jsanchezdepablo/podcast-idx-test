import React, { useEffect, useMemo } from "react";
import TextField from "@mui/material/TextField";
import { usePodcastsSelector, PodcastsActions } from "states/podcasts";
import DefaultCircularProgress from "components/circular-progress";
import Card from "./components/card";

import "./styles.scss";

const PodcastsView = () => {
  const {
    state: { podcasts, isLoading },
  } = usePodcastsSelector();

  const { searchPodcasts } = PodcastsActions.useFetchPodcasts();

  useEffect(() => {
    searchPodcasts();
  }, []);

  const podcastCards = useMemo(() => {
    if (podcasts.length > 0) {
      return podcasts.map((podcast) => <Card key={podcast.title} data={podcast} />);
    }
  }, [podcasts]);

  return (
    <div>
      <div className="podcast__filter-container">
        <div className="podcast__filter-count">{podcasts.length}</div>
        <TextField label="Filter podcasts" variant="outlined" size="small" />
      </div>
      {isLoading ? <DefaultCircularProgress /> : <div className="podcast__cards">{podcastCards}</div>}
    </div>
  );
};

export default PodcastsView;
