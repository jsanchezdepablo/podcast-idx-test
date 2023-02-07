import React from "react";
import { shallow } from "enzyme";
import PodcastRoutes from "../routes";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  lazy: (load) => {
    return load();
  },
}));

describe("Podcasts Routes", () => {
  it("Matches snapshot", async () => {
    const wrapper = shallow(<div>{PodcastRoutes}</div>);
    expect(wrapper).toMatchSnapshot();
  });
});
