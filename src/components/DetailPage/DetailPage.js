import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setForecast } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import moment from "moment";

import IconBack from "../../assets/Arrow - Left.png";
import AddButton from "../../assets/Plus-white.png";

import "./styles/index.scss";

const DetailPage = () => {
  const [hours, setHours] = useState(null);
  const [nextDaysForecast, setNextDaysForecast] = useState([]);

  const allLocations =
    useSelector((state) => state.weatherReducer.locations) || null;
  const forecastTimeline =
    useSelector(
      (state) =>
        state.weatherReducer.forecastTimeline?.list &&
        state.weatherReducer.forecastTimeline?.list,
    ) || null;

  const dispatch = useDispatch();

  const { id } = useParams();

  const currentItem =
    allLocations.length > 0 ? allLocations.find((item) => id == item.id) : {};

  const weather = currentItem.weather && currentItem?.weather[0]?.main;
  const temperature = currentItem?.main && currentItem?.main?.temp;
  const weatherIcon =
    (currentItem.weather && currentItem?.weather[0]?.icon) || "";

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

  useEffect(() => {
    getHourlyWeather();

    if (forecastTimeline) {
      if (forecastTimeline.length > 0) {
        const today = moment().format("yyyy MM DD").replaceAll(" ", "-");

        setHours(
          forecastTimeline
            ?.filter((hr) => hr.dt_txt?.slice(0, 10) == today)
            .map((hrs) => hrs.dt_txt),
        );

        setNextDaysForecast(
          forecastTimeline
            ?.filter((date) => date?.dt_txt.slice(0, 10) !== today)
            .filter((_, i) => i % 8 == 0),
        );
      }
    }
  }, []);

  const getHourlyWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${currentItem.name}&appid=${process.env.REACT_APP_API_KEY}`;

    const { data } = await axios.get(url);
    dispatch(setForecast(data));
  };

  return (
    console.log("LOG_____________________> ", nextDaysForecast),
    (
      <div className={`weather-city-details ${giveClassByWeatherType()}`}>
        <div className="header">
          <Link to="/">
            <img src={IconBack} alt="icon back" className="icon-back"></img>
          </Link>
          {currentItem.name && (
            <h1 className="city-name">{currentItem.name}</h1>
          )}
          <img src={AddButton} alt="add button" className="icon-add"></img>
        </div>
        <div className="hero-section">
          <h2 className="date">{moment().format("dddd, DD, MMMM ")}</h2>
          {weather && <h3 className="weather-type">{weather}</h3>}
          <div className="hero-subSection">
            {weatherIcon && (
              <img
                src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                alt="weather icon"
                className="weather-icon"
              />
            )}
            {temperature && (
              <h6 className="temperature">{temperature.toFixed(0)}°</h6>
            )}
          </div>
        </div>
        {nextDaysForecast.length > 0 && (
          <div className="nextDays">
            {nextDaysForecast?.map((day, idx) => (
              <div className="day-box" key={idx}>
                <div className="day-name">
                  {moment(day.dt_txt.slice(0, 10)).format("dddd")}
                </div>
                <div className="day-temp">{day.main.temp.toFixed(0)}°</div>
              </div>
            ))}
          </div>
        )}
        {/*<div className="timeline">{hours.map((time) => (
       
      ))}</div>*/}
      </div>
    )
  );
};

export default DetailPage;
