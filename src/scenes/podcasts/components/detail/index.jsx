import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { usePodcastsSelector, PodcastsActions } from "states/podcasts";
import { getDateParser, getMinutesFromMs } from "utils/handler-time";
import LargeCard from "../large-card";

import "./styles.scss";

const COLUMNS = [
  {
    field: "title",
    headerName: "Title",
    sortable: false,
    minWidth: 450,
    renderCell: (params) => (
      <Link
        className="detail__grid-link"
        to={(location) => ({ ...location, pathname: `${location.pathname}/episode/${params.id}` })}
      >
        {params.value}
      </Link>
    ),
  },
  { field: "date", headerName: "Date", sortable: false, minWidth: 150 },
  { field: "duration", headerName: "Duration", sortable: false, minWidth: 120 },
];

const DetailView = ({ match }) => {
  const {
    state: { podcasts, podcast, isLoading, lastDetailPodcastUpdatedDate },
  } = usePodcastsSelector();

  const { searchPodcast } = PodcastsActions.useFetchPodcast();
  const { setIsFirstStart } = PodcastsActions.usePodcastActions();

  useEffect(() => {
    setIsFirstStart(false);
  }, []);

  useEffect(() => {
    if (match.params.podcastId != null) {
      searchPodcast(match.params.podcastId, lastDetailPodcastUpdatedDate);
    }
  }, []);

  const getRowData = () =>
    podcast?.episodes?.map((episode) => ({
      ...episode,
      id: podcast.id,
      date: getDateParser(episode.date),
      duration: getMinutesFromMs(episode.duration),
    }));

  return (
    <div className="detail">
      <Paper elevation={3}>
        <LargeCard data={podcasts?.find(({ id }) => id === match.params.podcastId)} />
      </Paper>
      <div className="detail__episodes">
        <Paper elevation={3}>
          <div className="detail__episodes-count">Episodes: {podcast.episodesCount}</div>
        </Paper>
        <Paper elevation={3}>
          <DataGrid
            columns={COLUMNS}
            rows={getRowData() ?? []}
            getRowId={(row) => row.id}
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
