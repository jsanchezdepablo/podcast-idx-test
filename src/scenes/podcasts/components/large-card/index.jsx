import React from "react";

import "./styles.scss";

const LargeCard = ({ data }) => (
  <div className="large-card">
    <div className="large-card__image">
      <img src={data?.image} />
    </div>
    <hr className="large-card__separator" />
    <div className="large-card__primary-text">
      <div className="large-card__primary-text--title">{data?.title}</div>
      <div className="large-card__primary-text--subtitle">by {data?.artist}</div>
    </div>
    <hr className="large-card__separator" />
    <div className="large-card__secondary-text">
      <div className="large-card__secondary-text--title">Description:</div>
      <div className="large-card__secondary-text--subtitle">by {data?.description}</div>
    </div>
  </div>
);

export default LargeCard;
