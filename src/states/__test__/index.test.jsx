import React from "react";
import { shallow } from "enzyme";
import GlobalStateProvider from "../";

const MOCK_PROPS = {
  children: <div className="test">Children</div>,
};

describe("States Component", () => {
  it("Matches snapshot", () => {
    const wrapper = shallow(<GlobalStateProvider {...MOCK_PROPS} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render children", () => {
    const wrapper = shallow(<GlobalStateProvider {...MOCK_PROPS} />);
    expect(wrapper.find(".test").exists()).toBeTruthy();
  });
});
