import React from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import "./styles.scss";

const Card = ({ data }) => (
  <Link to={(location) => `${location.pathname}podcast/${data.id}`}>
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
  </Link>
);

export default Card;
