import React from "react";
import { shallow } from "enzyme";
import * as PodcastsState from "states/podcasts";
import DetailView from "../";

const MOCK_PODCASTS = [
  {
    id: "1",
    title: "title-1",
    artist: "artist-1",
    image: "//image",
    description: "description",
    episodes: [{ name: "name", date: "date", duration: "duration" }],
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
  match: { params: { podcastId: "1" } },
};

describe("DetailView Component", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();

    jest
      .spyOn(PodcastsState, "usePodcastsSelector")
      .mockImplementation(() => ({ state: { podcasts: MOCK_PODCASTS, isLoading: false } }));

    jest
      .spyOn(PodcastsState.PodcastsActions, "useFetchEpisodes")
      .mockImplementation(() => ({ searchEpisodes: () => {} }));
    jest
      .spyOn(PodcastsState.PodcastsActions, "usePodcastActions")
      .mockImplementation(() => ({ setIsFirstStart: () => {} }));
  });

  it("Matches snapshot", () => {
    const wrapper = shallow(<DetailView {...MOCK_PROPS} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Should call grid props and render elements", () => {
    const wrapper = shallow(<DetailView {...MOCK_PROPS} />);

    wrapper.find("Memo(ForwardRef(DataGrid))").props().columns[0].renderCell(MOCK_PODCASTS[0].episodes);
    wrapper.find("Memo(ForwardRef(DataGrid))").props().getRowId({ id: "1" });
    wrapper.find("Memo(ForwardRef(DataGrid))").props().getRowClassName({ indexRelativeToCurrentPage: 1 });
    wrapper.find("Memo(ForwardRef(DataGrid))").props().getRowClassName({ indexRelativeToCurrentPage: 2 });
    expect(wrapper.find(".detail__episodes-count").props().children[1]).toBe(MOCK_PODCASTS[0].episodes.length);
  });
});
