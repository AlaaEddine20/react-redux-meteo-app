import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import { giveClassByWeatherType } from "../../utils/utils";
import IconBack from "../../assets/Arrow - Left.png";
import "./styles/index.scss";

const DetailPage = () => {
  const [currentItem, setCurrentItem] = useState();
  const [forecast, setForecast] = useState([]);
  const { id } = useParams();

  const allLocations = useSelector((state) => state.weatherReducer.locations);
  const today = moment().format("yyyy MM DD").replaceAll(" ", "-");

  useEffect(() => {
    if (allLocations?.length > 0) {
      setCurrentItem(allLocations.find((item) => item.id == id));
      if (currentItem) {
        console.log(currentItem);
        getForecastData();
      }
    }

    // TODO: add hours forecast timeline
    /* setHours(
      forecast
        ?.filter((hr) => hr.dt_txt?.slice(0, 10) === today)
        .map((hrs) => hrs.dt_txt),
    ); */
  }, [currentItem]);

  // TODO: add hours forecast timeline
  const getForecastData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${currentItem.name}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    const { data } = await axios.get(url);
    setForecast(data.list);
  };

  return currentItem ? (
    <div
      className={`weather-city-details ${giveClassByWeatherType(
        currentItem.weather[0]?.main
      )}`}
    >
      <div className="header">
        <Link to="/">
          <img src={IconBack} alt="icon back" className="icon-back"></img>
        </Link>
        {currentItem.name && <h1 className="city-name">{currentItem.name}</h1>}
      </div>
      <div className="hero-section">
        <h2 className="date">{moment().format("dddd, DD, MMMM ")}</h2>
        <h3 className="weather-type">{currentItem.weather[0]?.description}</h3>
        <div className="hero-subSection">
          {currentItem.weather[0]?.icon && (
            <img
              src={`http://openweathermap.org/img/wn/${currentItem.weather[0]?.icon}@2x.png`}
              alt="weather icon"
              className="weather-icon"
            />
          )}
          <div className="temperature">
            {currentItem?.main?.temp.toString().slice(0, 2)}°
          </div>
        </div>
      </div>
      {forecast?.length > 0 && (
        <div className="nextDays">
          {forecast
            .filter((date) => date?.dt_txt.slice(0, 10) !== today)
            .filter((_, i) => i % 8 === 0)
            ?.map((day, idx) => {
              const minTemp = day.main.temp_min.toString().slice(0, 2);
              const maxTemp = day.main.temp_max.toString().slice(0, 2);
              return (
                <div className="day-box" key={idx}>
                  <div className="day-name">
                    {moment(day.dt_txt.slice(0, 10)).format("dddd")}
                  </div>
                  <div className="day-temp">
                    <span className="min-temp">{minTemp}°</span>
                    <span className="max-temp">{maxTemp}°</span>
                  </div>
                  <div className="day-weather-icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`}
                      alt="weather icon"
                      className="weather-icon"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  ) : null;
};

export default DetailPage;
