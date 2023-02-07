import React from "react";
import { shallow } from "enzyme";
import * as PodcastsState from "states/podcasts";
import PodcastsView from "../";

const MOCK_PODCASTS = [
  {
    id: "1",
    title: "title-1",
    artist: "artist-1",
    image: "//image",
    description: "description",
  },
  {
    id: "2",
    title: "title-2",
    artist: "artist-2",
    image: "//image",
    description: "description",
  },
];
describe("PodcastsView", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();

    jest
      .spyOn(PodcastsState, "usePodcastsSelector")
      .mockImplementation(() => ({ state: { podcasts: [], isLoading: false, lastUpdatedDate: "date" } }));

    jest
      .spyOn(PodcastsState.PodcastsActions, "useFetchPodcasts")
      .mockImplementation(() => ({ searchPodcasts: () => {} }));
  });

  it("Matches snapshot", () => {
    const wrapper = shallow(<PodcastsView />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render loader", () => {
    jest.spyOn(PodcastsState, "usePodcastsSelector").mockImplementation(() => ({ state: { isLoading: true } }));

    const wrapper = shallow(<PodcastsView />);
    expect(wrapper.find("DefaultCircularProgress").exists()).toBeTruthy();
  });

  it("Should render podcast cards", () => {
    jest
      .spyOn(PodcastsState, "usePodcastsSelector")
      .mockImplementation(() => ({ state: { podcasts: MOCK_PODCASTS, isLoading: false } }));

    const wrapper = shallow(<PodcastsView />);
    expect(wrapper.find(".podcast__cards").exists()).toBeTruthy();
  });

  it("Should call onChange Textfield", () => {
    const wrapper = shallow(<PodcastsView />);
    wrapper
      .find("ForwardRef(TextField)")
      .props()
      .onChange({ target: { value: "value" } });
  });
});
