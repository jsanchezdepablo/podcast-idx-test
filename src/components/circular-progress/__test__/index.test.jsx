import React from "react";
import { shallow } from "enzyme";
import DefaultCircularProgress from "..";

describe("DefaultCircularProgress Component", () => {
  it("Matches snapshot", () => {
    const wrapper = shallow(<DefaultCircularProgress />);
    expect(wrapper).toMatchSnapshot();
  });

  it("test", () => {
    const wrapper = shallow(<DefaultCircularProgress />);
    expect(wrapper.find(".circular-progress__container").exists()).toBeTruthy();
  });
});
