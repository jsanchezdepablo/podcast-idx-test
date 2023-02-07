import ACTION_TYPES from "./action-types";
import INIT_STATE from "./init-state";

const Reducer = (state, { type, payload }) => {
  const config = {
    [ACTION_TYPES.SET_PODCASTS]: () => {
      const podcasts = payload.feed.entry.map((podcast) => {
        const title = podcast.title.label?.split("-")[0];
        const artist = podcast["im:artist"].label;
        const image = podcast["im:image"][2].label;
        const description = podcast.summary.label;
        const id = podcast.id.attributes["im:id"];

        return { id, title, artist, image, description };
      });
      return { ...state, podcasts };
    },
    [ACTION_TYPES.SET_PODCAST_EPISODES]: () => {
      const episodes = payload.results.reduce((prev, current) => {
        if (current.kind === "podcast-episode") {
          const episode = {
            id: current.trackId,
            collectionId: current.collectionId,
            name: current.trackName.toLowerCase(),
            date: current.releaseDate,
            duration: current.trackTimeMillis,
            audio: current.previewUrl,
            description: current.description,
          };
          prev.push(episode);
        }
        return prev;
      }, []);

      const podcastsWithEpisodes = state.podcasts.map((podcast) => {
        if (episodes[0].collectionId == podcast.id) {
          return { ...podcast, episodes };
        } else {
          return podcast;
        }
      });
      return { ...state, podcasts: podcastsWithEpisodes };
    },
    [ACTION_TYPES.SET_IS_LOADING]: () => ({ ...state, isLoading: payload }),
    [ACTION_TYPES.SET_IS_FIRST_START]: () => ({ ...state, isFirstStart: payload }),
    [ACTION_TYPES.SET_LAST_PODCASTS_UPDATED_DATE]: () => ({ ...state, lastUpdatedDate: payload }),
    [ACTION_TYPES.SET_LAST_PODCAST_EPISODES_UPDATED_DATE]: () => {
      const podcastsWithLastUpdatedDate = state.podcasts.map((podcast) => {
        if (payload.podcastId == podcast.id) {
          return { ...podcast, lastUpdatedDate: payload.lastUpdatedDate };
        } else {
          return podcast;
        }
      });
      return { ...state, podcasts: podcastsWithLastUpdatedDate };
    },
    [ACTION_TYPES.RESET]: () => ({ ...INIT_STATE }),
  };
  return config[type]?.() ?? state;
};

export default Reducer;
