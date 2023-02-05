import { useEffect } from "react";
import { useFetchApi } from "states/utils";
import { Selector } from "./context";
import ACTION_TYPES from "./action-types";

const URL_PODCASTS = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

export const useFetchPodcasts = () => {
  const { dispatch } = Selector();
  const { search: searchApi, result, isLoading /* status, lastUpdated */ } = useFetchApi(URL_PODCASTS);

  useEffect(() => {
    if (result.length > 0) {
      dispatch({ type: ACTION_TYPES.SET_PODCASTS, payload: result });
    }
  }, [result]);

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SET_IS_LOADING, payload: isLoading });
  }, [isLoading]);

  const searchPodcasts = () => {
    if (!isLoading) {
      searchApi();
    }
  };

  return { searchPodcasts };
};

const actions = { useFetchPodcasts };

export default actions;