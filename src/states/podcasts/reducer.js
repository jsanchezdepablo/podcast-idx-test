import ACTION_TYPES from "./action-types";
import INIT_STATE from "./init-state";

const Reducer = (state, { type, payload }) => {
  const config = {
    [ACTION_TYPES.SET_PODCASTS]: () => {
      const podcasts = payload.map((podcast) => {
        const title = podcast.title.label?.split("-")[0];
        const artist = podcast["im:artist"].label;
        const image = podcast["im:image"][2].label;
        const description = podcast.summary.label;

        return { title, artist, image, description };
      });
      return { ...state, podcasts };
    },

    [ACTION_TYPES.SET_IS_LOADING]: () => ({ ...state, isLoading: payload }),
    [ACTION_TYPES.RESET]: () => ({ ...INIT_STATE }),
  };
  return config[type]?.() ?? state;
};

export default Reducer;
