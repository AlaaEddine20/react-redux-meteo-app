import React from "react";
import moment from "moment";

import "./styles/index.scss";

const CityCard = ({ cityName, temperature, weather, icon }) => {
  return (
    <div
      className={`cityCard ${weather === "Clouds" && "clouds"} ${
        weather === "Clear" && "clear"
      } ${weather === "Rain" && "rain"} ${weather === "Snow" && "snow"}`}
    >
      <div className="left-content">
        {cityName && <p className="city-name">{cityName}</p>}
        <p className="date">{moment().format("dddd, DD, MMMM ")}</p>
        <p className="time">{moment().format("h:mm a")}</p>
      </div>
      <div className="center-content">
        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="" />
      </div>
      <div className="right-content">
        <p className="temperature">{temperature}</p>
      </div>
    </div>
  );
};

export default CityCard;
