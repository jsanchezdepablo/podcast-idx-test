import { useEffect } from "react";
import { useFetchApi } from "states/utils";
import { Selector } from "./context";
import ACTION_TYPES from "./action-types";
import { getIsSpent24hours } from "utils/handler-time";

const URL_PODCASTS = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
const URL_EPISODES = "https://itunes.apple.com/lookup";

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

const useFetchEpisodes = (shouldCacheData = true) => {
  const { dispatch } = Selector();
  const { search: searchApi, result, isLoading, lastUpdatedDate } = useFetchApi(URL_EPISODES);

  useEffect(() => {
    if (result != null) {
      dispatch({ type: ACTION_TYPES.SET_PODCAST_EPISODES, payload: result });
    }
  }, [result]);

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SET_IS_LOADING, payload: isLoading });
  }, [isLoading]);

  useEffect(() => {
    if (lastUpdatedDate != null && result != null) {
      dispatch({
        type: ACTION_TYPES.SET_LAST_PODCAST_EPISODES_UPDATED_DATE,
        payload: { lastUpdatedDate, podcastId: result?.results[0]?.collectionId },
      });
    }
  }, [lastUpdatedDate, result]);

  const searchEpisodes = (id, storageDate) => {
    if (!isLoading && (shouldCacheData ? getIsSpent24hours(storageDate) : true)) {
      searchApi({ id, entity: "podcastEpisode" });
    }
  };

  return { searchEpisodes };
};

const actions = { usePodcastActions, useFetchPodcasts, useFetchEpisodes };

export default actions;
