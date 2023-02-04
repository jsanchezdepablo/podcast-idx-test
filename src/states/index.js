import React from "react";
import { PodcastsProvider } from "./podcasts";

const GlobalStateProvider = ({ children }) => <PodcastsProvider>{children}</PodcastsProvider>;

export default GlobalStateProvider;
