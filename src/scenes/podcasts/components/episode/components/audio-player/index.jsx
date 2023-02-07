import React, { useState } from "react";

import "./styles.scss";

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="audio__container">
      <audio className="audio__player" controls={true} onPlay={togglePlay} onPause={togglePlay}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
