import React from "react";
import { shallow } from "enzyme";
import AudioPlayer from "../";

const MOCK_PROPS = {
  src: "src",
};

describe("AudioPlayer Component", () => {
  it("Matches snapshot", () => {
    const wrapper = shallow(<AudioPlayer {...MOCK_PROPS} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Should stop playing", () => {
    const wrapper = shallow(<AudioPlayer {...MOCK_PROPS} />);
    wrapper.find(".audio__player").props().onPause();
  });

  it("Should start playing", () => {
    const wrapper = shallow(<AudioPlayer {...MOCK_PROPS} />);
    wrapper.find(".audio__player").props().onPlay();
  });
});
