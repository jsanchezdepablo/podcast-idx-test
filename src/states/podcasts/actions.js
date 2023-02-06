import { useEffect } from "react";
import { useFetchApi } from "states/utils";
import { Selector } from "./context";
import ACTION_TYPES from "./action-types";
import { getIsSpent24hours } from "utils/handler-time";

const URL_PODCASTS = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
const URL_PODCAST = "https://itunes.apple.com/lookup";

const usePodcastActions = () => {
  const { dispatch } = Selector();

  const setIsFirstStart = (isFirstStart) => {
    dispatch({ type: ACTION_TYPES.SET_IS_FIRST_START, payload: isFirstStart });
  };

  return {
    setIsFirstStart,
  };
};

const useFetchPodcasts = (shouldCacheData = true) => {
  const { dispatch } = Selector();
  const { search: searchApi, result, isLoading, lastUpdatedDate } = useFetchApi(URL_PODCASTS);

  useEffect(() => {
    if (result != null) {
      dispatch({ type: ACTION_TYPES.SET_PODCASTS, payload: result });
    }
  }, [result]);

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SET_IS_LOADING, payload: isLoading });
  }, [isLoading]);

  useEffect(() => {
    if (lastUpdatedDate != null) {
      dispatch({ type: ACTION_TYPES.SET_LAST_PODCASTS_UPDATED_DATE, payload: lastUpdatedDate });
    }
  }, [lastUpdatedDate]);

  const searchPodcasts = (storageDate) => {
    if (!isLoading && (shouldCacheData ? getIsSpent24hours(storageDate) : true)) {
      searchApi();
    }
  };

  return { searchPodcasts };
};

const useFetchPodcast = (shouldCacheData = true) => {
  const { dispatch } = Selector();
  const { search: searchApi, result, isLoading, lastUpdatedDate } = useFetchApi(URL_PODCAST);

  useEffect(() => {
    if (result != null) {
      dispatch({ type: ACTION_TYPES.SET_PODCAST, payload: result });
    }
  }, [result]);

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SET_IS_LOADING, payload: isLoading });
  }, [isLoading]);

  useEffect(() => {
    if (lastUpdatedDate != null) {
      dispatch({ type: ACTION_TYPES.SET_LAST_DETAIL_PODCAST_UPDATED_DATE, payload: lastUpdatedDate });
    }
  }, [lastUpdatedDate]);

  const searchPodcast = (id, storageDate) => {
    if (!isLoading && (shouldCacheData ? getIsSpent24hours(storageDate) : true)) {
      searchApi({ id });
    }
  };

  return { searchPodcast };
};

const actions = { usePodcastActions, useFetchPodcasts, useFetchPodcast };

export default actions;
