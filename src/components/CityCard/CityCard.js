import React from "react";
import moment from "moment";
import { giveClassByWeatherType } from "../../utils/utils";
import "./styles/index.scss";

const CityCard = ({ cityName, temperature, weather, icon }) => {

  

  return (
    <div className={`cityCard ${giveClassByWeatherType(weather)}`}>
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
