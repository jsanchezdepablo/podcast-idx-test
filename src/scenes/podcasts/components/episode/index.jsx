import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import LargeCard from "../large-card";
import { usePodcastsSelector, PodcastsActions } from "states/podcasts";
import AudioPlayer from "./components/audio-player";
import TextWithLink from "components/text-with-link";

import "./styles.scss";

const EpisodeView = ({ match }) => {
  const {
    state: { podcasts },
  } = usePodcastsSelector();

  const { setIsFirstStart } = PodcastsActions.usePodcastActions();

  const podcast = podcasts?.find(({ id }) => id == match.params.podcastId);
  const episode = podcast?.episodes?.find(({ id }) => id == match.params.episodeId);

  useEffect(() => {
    setIsFirstStart(false);
  }, []);

  return (
    <div className="detail">
      <Paper elevation={3}>
        <LargeCard data={podcast} />
      </Paper>
      <div className="detail__episode">
        <Paper elevation={3} className="detail__episode-container">
          <div>
            <div className="detail__episode-title">{episode?.name}</div>
            <div className="detail__episode-description">
              <TextWithLink text={episode?.description} />
            </div>
          </div>
          <hr />
          <AudioPlayer src={episode?.audio} />
        </Paper>
      </div>
    </div>
  );
};

export default EpisodeView;
