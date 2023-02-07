import React from "react";
import { shallow } from "enzyme";
import * as PodcastsState from "states/podcasts";
import Layout from "layout";

describe("Layout", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();

    jest.spyOn(PodcastsState, "usePodcastsSelector").mockImplementation(() => ({ state: { isFirstStart: false } }));
  });

  it("Matches snapshot", () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render indicator", () => {
    jest.spyOn(PodcastsState, "usePodcastsSelector").mockImplementation(() => ({ state: { isFirstStart: true } }));
    const wrapper = shallow(<Layout />);

    expect(wrapper.find(".layout__header-indicator").exists()).toBeTruthy();
  });

  it("Should render children", () => {
    const mockProps = { children: <div className="test">Children</div> };
    const wrapper = shallow(<Layout {...mockProps} />);

    expect(wrapper.find(".test").exists()).toBeTruthy();
  });
});
