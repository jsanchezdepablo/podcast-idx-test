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

    [ACTION_TYPES.SET_PODCAST]: () => {
      const podcast = payload.results.reduce((prev, current) => {
        prev["id"] = current.trackId;
        prev["episodesCount"] = current.trackCount;
        prev["episodes"] = [{ title: current.trackName, date: current.releaseDate, duration: current.trackTimeMillis }];
        return prev;
      }, {});

      return { ...state, podcast };
    },
    [ACTION_TYPES.SET_IS_LOADING]: () => ({ ...state, isLoading: payload }),
    [ACTION_TYPES.SET_IS_FIRST_START]: () => ({ ...state, isFirstStart: payload }),
    [ACTION_TYPES.RESET]: () => ({ ...INIT_STATE }),
  };
  return config[type]?.() ?? state;
};

export default Reducer;
