import React from "react";
import moment from "moment";

import "./styles/index.scss";

const CityCard = ({ cityName, temperature, weather, icon }) => {

  const giveClassByWeatherType = () => {
    if (weather == "Clouds") {
      return "clouds";
    } else if (weather == "Clear") {
      return "clear";
    } else if (weather == "Rain") {
      return "rain";
    } else if (weather == "Snow") {
      return "snow";
    }
  };

  return (
    <div className={`cityCard ${giveClassByWeatherType()}`}>
      <div className="left-content">
        {cityName && <p className="city-name">{cityName}</p>}
        <p className="date">{moment().format("dddd, DD, MMMM ")}</p>
        <p className="time">{moment().format("h:mm a")}</p>
      </div>
      <div className="center-content">
        {icon && (
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        )}
      </div>
      <div className="right-content">
        {temperature && <p className="temperature">{temperature.toFixed(0)}</p>}
      </div>
    </div>
  );
};

export default CityCard;
