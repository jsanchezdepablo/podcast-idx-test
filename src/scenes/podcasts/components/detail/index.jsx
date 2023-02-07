import React, { useEffect, useMemo } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { usePodcastsSelector, PodcastsActions } from "states/podcasts";
import { getDateParser, getMinutesParserFromMs } from "utils/handler-time";
import LargeCard from "../large-card";

import "./styles.scss";

const COLUMNS = [
  {
    field: "name",
    headerName: "Title",
    sortable: false,
    minWidth: 400,
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
  { field: "duration", headerName: "Duration", sortable: false, minWidth: 120, align: "center" },
];

const DetailView = ({ match }) => {
  const {
    state: { podcasts, isLoading },
  } = usePodcastsSelector();

  const podcast = podcasts?.find(({ id }) => id === match.params.podcastId);

  const { searchEpisodes } = PodcastsActions.useFetchEpisodes();
  const { setIsFirstStart } = PodcastsActions.usePodcastActions();

  useEffect(() => {
    setIsFirstStart(false);
  }, []);

  useEffect(() => {
    if (match.params.podcastId != null) {
      searchEpisodes(match.params.podcastId, podcast?.lastUpdatedDate);
    }
  }, []);

  const rowData = useMemo(
    () =>
      podcast?.hasOwnProperty("episodes")
        ? podcast?.episodes?.map((episode) => ({
            ...episode,
            date: getDateParser(episode.date),
            duration: getMinutesParserFromMs(episode.duration),
          }))
        : [],
    [podcast?.episodes],
  );

  return (
    <div className="detail">
      <Paper elevation={3}>
        <LargeCard data={podcast} />
      </Paper>
      <div className="detail__episodes">
        <Paper elevation={3}>
          <div className="detail__episodes-count">Episodes: {podcast?.episodes?.length}</div>
        </Paper>
        <Paper elevation={3} className="detail__grid-container">
          <DataGrid
            getRowId={({ id }) => id}
            columns={COLUMNS}
            rows={rowData}
            loading={isLoading}
            experimentalFeatures={{ newEditingApi: true }}
            disableColumnMenu
            hideFooter
          />
        </Paper>
      </div>
    </div>
  );
};

export default DetailView;
