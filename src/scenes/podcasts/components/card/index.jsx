import React from "react";
import Paper from "@mui/material/Paper";

import "./styles.scss";

const Card = ({ data }) => (
  <Paper className="card" elevation={3}>
    <div className="card__container">
      <div className="card__container-image">
        <img src={data.image} />
      </div>
      <div className="card__container-text">
        <div className="card__container-text--title">{data.title}</div>
        <div className="card__container-text--subtitle">Author: {data.artist}</div>
      </div>
    </div>
  </Paper>
);

export default Card;
