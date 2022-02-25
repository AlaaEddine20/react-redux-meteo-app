import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import moment from "moment";

import IconBack from "../../assets/Arrow - Left.png";
import AddButton from "../../assets/Plus-white.png";

import "./styles/index.scss";

const DetailPage = () => {
  const allLocations = useSelector((state) => state.weatherReducer.locations);

  const { id } = useParams();

  const currentItem =
    allLocations.length > 0 ? allLocations.find((item) => id == item.id) : {};

  const weather = currentItem.weather[0].main || "";
  const temperature = currentItem.main.temp || null;
  const weatherIcon = currentItem.weather[0].icon || "";

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
    <div className={`weather-city-details ${giveClassByWeatherType()}`}>
      <div className="header">
        <img src={IconBack} alt="icon back" className="icon-back"></img>
        <h1 className="city-name">{currentItem.name}</h1>
        <img src={AddButton} alt="add button" className="icon-add"></img>
      </div>
      <div className="hero-section">
        <h2 className="date">{moment().format("dddd, DD, MMMM ")}</h2>
        <h3 className="weather-type">{weather}</h3>
        <div className="hero-subSection">
          <img
            src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
            alt="weather icon"
            className="weather-icon"
          />
          <h6 className="temperature">{temperature.toFixed(0)}</h6>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
