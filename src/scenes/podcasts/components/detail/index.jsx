import React, { useEffect, useMemo } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { usePodcastsSelector, PodcastsActions } from "states/podcasts";
import { getDateParser, getMinutes } from "utils/time-parser";
import LargeCard from "../large-card";

import "./styles.scss";

const COLUMNS = [
  { field: "title", headerName: "Title", sortable: false, minWidth: 450 },
  { field: "date", headerName: "Date", sortable: false, minWidth: 150 },
  { field: "duration", headerName: "Duration", sortable: false, minWidth: 120 },
];

const DetailView = ({ match }) => {
  const {
    state: { podcasts, podcast, isLoading },
  } = usePodcastsSelector();

  const { searchPodcast } = PodcastsActions.useFetchPodcast();
  const { setIsFirstStart } = PodcastsActions.usePodcastActions();

  useEffect(() => {
    setIsFirstStart(false);
  }, []);

  useEffect(() => {
    if (match.params.id != null) {
      searchPodcast(match.params.id);
    }
  }, []);

  const episodeCard = useMemo(() => {
    const podcastInfo = podcasts?.find(({ id }) => id == podcast.id);
    return podcastInfo != null ? <LargeCard data={podcastInfo} /> : <h2>No card info</h2>;
  }, [podcast]);

  const getRowData = () =>
    podcast?.episodes?.map((episode) => ({
      ...episode,
      date: getDateParser(episode.date),
      duration: getMinutes(episode.duration),
    }));

  return (
    <div className="detail">
      <Paper elevation={3}>{episodeCard}</Paper>
      <div className="detail__episodes">
        <Paper elevation={3}>
          <div className="detail__episodes-count">Episodes: {podcast.episodesCount}</div>
        </Paper>
        <Paper elevation={3}>
          <DataGrid
            columns={COLUMNS}
            rows={getRowData() ?? []}
            getRowId={(row) => row.title}
            loading={isLoading}
            experimentalFeatures={{ newEditingApi: true }}
            autoHeight
            disableColumnMenu
            hideFooter
          />
        </Paper>
      </div>
    </div>
  );
};

export default DetailView;
