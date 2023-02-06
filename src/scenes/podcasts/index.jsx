import React, { useEffect, useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import { usePodcastsSelector, PodcastsActions } from "states/podcasts";
import DefaultCircularProgress from "components/circular-progress";
import Card from "./components/card";

import "./styles.scss";

const PodcastsView = () => {
  const [filterValue, setFilterValue] = useState(null);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);

  const {
    state: { podcasts, isLoading, lastPodcastsUpdatedDate },
  } = usePodcastsSelector();

  const { searchPodcasts } = PodcastsActions.useFetchPodcasts();

  useEffect(() => {
    searchPodcasts(lastPodcastsUpdatedDate);
  }, []);

  useEffect(() => {
    if (podcasts.length > 0) {
      if (filterValue !== null) {
        const q = filterValue?.toLowerCase();
        const filtered = podcasts.filter(
          ({ title, artist }) => title.toLowerCase()?.includes(q) || artist.toLowerCase()?.includes(q),
        );
        setFilteredPodcasts([...filtered]);
      } else {
        setFilteredPodcasts([...podcasts]);
      }
    }
  }, [filterValue, podcasts]);

  const podcastCards = useMemo(() => {
    if (filteredPodcasts.length > 0) {
      return filteredPodcasts.map((podcast) => <Card key={podcast.title} data={podcast} />);
    }
  }, [filteredPodcasts]);

  return (
    <div>
      <div className="podcast__filter-container">
        <div className="podcast__filter-count">{filteredPodcasts.length}</div>
        <TextField
          label="Filter podcasts"
          variant="outlined"
          size="small"
          onChange={(e) => {
            setFilterValue(e.target.value);
          }}
        />
      </div>
      {isLoading ? <DefaultCircularProgress /> : <div className="podcast__cards">{podcastCards}</div>}
    </div>
  );
};

export default PodcastsView;
