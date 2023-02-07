import React from "react";
import { shallow } from "enzyme";
import { PodcastsProvider, PodcastsActions } from "..";
import Reducer from "../reducer";
import ACTION_TYPES from "../action-types";
import INIT_STATE from "../init-state";
import * as Context from "../context";
import * as Utils from "states/utils";
import * as HandlerTimeFunctions from "utils/handler-time";

jest.mock("react", () => {
  return {
    ...jest.requireActual("react"),
    useContext: (f) => f,
  };
});

describe("Podcasts state", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it("Podcasts Provider", () => {
    const wrapper = shallow(
      <PodcastsProvider>
        <div className="test-class" />
      </PodcastsProvider>,
    );
    expect(wrapper.find(".test-class").exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it("Podcasts Actions - usePodcastActions", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(Context, "Selector").mockImplementation(() => ({ dispatch: mockDispatch }));

    let resultUsePodcastActions = null;
    const UsePodcastActions = () => {
      resultUsePodcastActions = PodcastsActions.usePodcastActions();
      return <div />;
    };

    shallow(<UsePodcastActions />);
    expect(mockDispatch).toHaveBeenCalledTimes(0);

    resultUsePodcastActions.setIsFirstStart();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it("Podcasts Actions - useFetchPodcasts", () => {
    const mockDispatch = jest.fn();
    const mockSearch = jest.fn();
    const useFetchOneApi = jest.spyOn(Utils, "useFetchApi");

    useFetchOneApi.mockImplementation(() => ({ result: [], isLoading: false, search: mockSearch }));

    jest.spyOn(Context, "Selector").mockImplementation(() => ({ dispatch: mockDispatch }));
    jest.spyOn(HandlerTimeFunctions, "getIsSpent24hours").mockImplementation(() => true);

    let resultUseFetchPodcasts = null;
    const UseFetchPodcasts = () => {
      resultUseFetchPodcasts = PodcastsActions.useFetchPodcasts();
      return <div />;
    };

    shallow(<UseFetchPodcasts />);
    expect(mockSearch).toHaveBeenCalledTimes(0);

    const args = { date: "date" };
    resultUseFetchPodcasts.searchPodcasts(args.date);
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });

  it("Podcasts Actions - useFetchEpisodes", () => {
    const mockDispatch = jest.fn();
    const mockSearch = jest.fn();
    const useFetchOneApi = jest.spyOn(Utils, "useFetchApi");

    useFetchOneApi.mockImplementation(() => ({ result: [], isLoading: false, search: mockSearch }));

    jest.spyOn(Context, "Selector").mockImplementation(() => ({ dispatch: mockDispatch }));
    jest.spyOn(HandlerTimeFunctions, "getIsSpent24hours").mockImplementation(() => true);

    let resultUseFetchEpisodes = null;
    const UseFetchEpisodes = () => {
      resultUseFetchEpisodes = PodcastsActions.useFetchEpisodes();
      return <div />;
    };

    shallow(<UseFetchEpisodes />);
    expect(mockSearch).toHaveBeenCalledTimes(0);

    const args = { id: "id", date: "date" };
    resultUseFetchEpisodes.searchEpisodes(args.id, args.date);
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });

  it("Podcasts Reducer", () => {
    const payload = { name: "test" };
    expect(Reducer({}, { type: "test" })).toEqual({});
    expect(Reducer({}, { type: ACTION_TYPES.SET_IS_LOADING, payload })).toMatchObject({ isLoading: payload });
    expect(Reducer({}, { type: ACTION_TYPES.SET_IS_FIRST_START, payload })).toMatchObject({ isFirstStart: payload });
    expect(Reducer({}, { type: ACTION_TYPES.SET_LAST_PODCASTS_UPDATED_DATE, payload })).toMatchObject({
      lastUpdatedDate: payload,
    });
    expect(Reducer({}, { type: ACTION_TYPES.RESET })).toEqual(INIT_STATE);
  });
});
