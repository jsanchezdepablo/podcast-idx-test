import React from "react";
import { shallow } from "enzyme";
import * as PodcastsState from "states/podcasts";
import EpisodeView from "../";

const MOCK_PODCASTS = [
  {
    id: "1",
    title: "title-1",
    artist: "artist-1",
    image: "//image",
    description: "description",
    episodes: [
      { id: "11", name: "name", date: "date", duration: "duration", description: "description", audio: "audio" },
    ],
  },
  {
    id: "2",
    title: "title-2",
    artist: "artist-2",
    image: "//image",
    description: "description",
  },
];

const MOCK_PROPS = {
  match: { params: { podcastId: "1", episodeId: "11" } },
};

describe("EpisodeView Component", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();

    jest.spyOn(PodcastsState, "usePodcastsSelector").mockImplementation(() => ({ state: { podcasts: MOCK_PODCASTS } }));

    jest
      .spyOn(PodcastsState.PodcastsActions, "usePodcastActions")
      .mockImplementation(() => ({ setIsFirstStart: () => {} }));
  });

  it("Matches snapshot", () => {
    const wrapper = shallow(<EpisodeView {...MOCK_PROPS} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render episode data", () => {
    const wrapper = shallow(<EpisodeView {...MOCK_PROPS} />);

    expect(wrapper.find(".detail__episode-title").props().children).toBe(MOCK_PODCASTS[0].episodes[0].name);
    expect(wrapper.find("TextWithLink").props().text).toBe(MOCK_PODCASTS[0].episodes[0].description);
    expect(wrapper.find("AudioPlayer").props().src).toBe(MOCK_PODCASTS[0].episodes[0].audio);
  });
});
