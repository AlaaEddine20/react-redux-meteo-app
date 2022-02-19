import React from "react";

import "./styles/index.scss";

const CityCard = () => {
  return (
    <div className="cityCard">
      <div className="left-content">
        <p className="city-name">Turin</p>
        <p className="date">Friday, 18, september</p>
        <p className="time">2:38 p.m</p>
      </div>
      <div className="center-content">ICON</div>
      <div className="right-content">
        <p className="temperature">18</p>
      </div>
    </div>
  );
};

export default CityCard;
