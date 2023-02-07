import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const LargeCard = ({ data }) => (
  <>
    {data != null ? (
      <div className="large-card">
        <div className="large-card__image">
          <Link to={(location) => ({ ...location, pathname: `/podcast/${data.id}` })}>
            <img src={data?.image} />
          </Link>
        </div>
        <hr className="large-card__separator" />
        <Link className="large-card__link" to={(location) => ({ ...location, pathname: `/podcast/${data.id}` })}>
          <div className="large-card__primary-text">
            <div className="large-card__primary-text--title">{data?.title}</div>
            <div className="large-card__primary-text--subtitle">by {data?.artist}</div>
          </div>
        </Link>
        <hr className="large-card__separator" />
        <div className="large-card__secondary-text">
          <div className="large-card__secondary-text--title">Description:</div>
          <div className="large-card__secondary-text--subtitle">by {data?.description}</div>
        </div>
      </div>
    ) : (
      <div className="large-card__no-info">
        <h2>No card info</h2>
      </div>
    )}
  </>
);

export default LargeCard;
