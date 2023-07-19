import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setForecast } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import moment from "moment";
import { giveClassByWeatherType } from "../../utils/utils";

import IconBack from "../../assets/Arrow - Left.png";
import AddButton from "../../assets/Plus-white.png";

import "./styles/index.scss";

const DetailPage = () => {
  const [nextDaysForecast, setNextDaysForecast] = useState([]);
  const [currentItem, setCurrentItem] = useState()

  const allLocations = useSelector((state) => state.weatherReducer.locations);
  const forecastTimeline = useSelector((state) => state.weatherReducer?.forecastTimeline);

  const dispatch = useDispatch();

  const { id } = useParams();




  useEffect(() => {
    getForecastData();

    if (allLocations.length > 0) {
      setCurrentItem(allLocations.find((item) => item.id == id))
    }

    if (forecastTimeline) {
      const today = moment().format("yyyy MM DD").replaceAll(" ", "-");

      // TODO: add hours forecast timeline
      /* setHours(
        forecastTimeline
          ?.filter((hr) => hr.dt_txt?.slice(0, 10) === today)
          .map((hrs) => hrs.dt_txt),
      ); */

      setNextDaysForecast(
        forecastTimeline
          .filter((date) => date?.dt_txt.slice(0, 10) !== today)
          .filter((_, i) => i % 8 === 0),
      );
      console.log("next days forecast: ", nextDaysForecast)
    }

  }, [currentItem]);


  
  console.log("current item: ", currentItem)

  // TODO: add hours forecast timeline
  const getForecastData = async () => {
    if (currentItem) {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${currentItem.name}&appid=${process.env.REACT_APP_API_KEY}`;
      const { data } = await axios.get(url);
      console.log("forecast data: ", data)
      dispatch(setForecast(data.list));
    }
  };

  return (
    currentItem ? (
      <div className={`weather-city-details ${giveClassByWeatherType(currentItem?.weather[0]?.main)}`}>
        <div className="header">
          <Link to="/">
            <img src={IconBack} alt="icon back" className="icon-back"></img>
          </Link>
          {currentItem.name && (
            <h1 className="city-name">{currentItem.name}</h1>
          )}
        </div>
        <div className="hero-section">
          <h2 className="date">{moment().format("dddd, DD, MMMM ")}</h2>
          <h3 className="weather-type">{currentItem.weather[0]?.main}</h3>
          <div className="hero-subSection">
            {currentItem.weather[0]?.icon && (
              <img
                src={`http://openweathermap.org/img/wn/${currentItem.weather[0]?.icon}@2x.png`}
                alt="weather icon"
                className="weather-icon"
              />
            )}
            <div className="temperature">{currentItem?.main?.temp.toString().slice(0, 2)}°</div>
          </div>
        </div>
        {nextDaysForecast?.length > 0 && (
          <div className="nextDays">
            {nextDaysForecast?.map((day, idx) => {
              const dayTemp = day.main.temp.toString().slice(0, 2);
              return (
                <div className="day-box" key={idx}>
                  <div className="day-name">
                    {moment(day.dt_txt.slice(0, 10)).format("dddd")}
                  </div>
                  <div className="day-temp">{dayTemp}°</div>
                  <div className="day-weather-icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`}
                      alt="weather icon"
                      className="weather-icon"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>) : null
  );
};

export default DetailPage;
