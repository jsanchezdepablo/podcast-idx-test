import { useEffect } from "react";
import { useFetchApi } from "states/utils";
import { Selector } from "./context";
import ACTION_TYPES from "./action-types";

const URL_PODCASTS = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
const URL_PODCAST = "https://itunes.apple.com/lookup";

export const useFetchPodcasts = () => {
  const { dispatch } = Selector();
  const { search: searchApi, result, isLoading /*  lastUpdated */ } = useFetchApi(URL_PODCASTS);

  useEffect(() => {
    if (result != null) {
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

export const useFetchPodcast = () => {
  const { dispatch } = Selector();
  const { search: searchApi, result, isLoading /*  lastUpdated */ } = useFetchApi(URL_PODCAST);

  useEffect(() => {
    if (result != null) {
      dispatch({ type: ACTION_TYPES.SET_PODCAST, payload: result });
    }
  }, [result]);

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SET_IS_LOADING, payload: isLoading });
  }, [isLoading]);

  const searchPodcast = (id) => {
    if (!isLoading) {
      searchApi({ id });
    }
  };

  return { searchPodcast };
};

const actions = { useFetchPodcasts, useFetchPodcast };

export default actions;
