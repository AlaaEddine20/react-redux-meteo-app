import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { addLocation, setLocations } from "../../redux/actions/index";

import CityCard from "../CityCard/CityCard.js";

import AddIcon from "./../../assets/Plus.png";
import Home from "./../../assets/Home.png";
import Search from "./../../assets/Search.png";
import Location from "./../../assets/Location.png";

import "./styles/index.scss";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddCity, setOpenAddCity] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const allLocations = useSelector((state) => state.weatherReducer.locations);

  const dispatch = useDispatch();

  const getWeatherByCityName = async () => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

    const { data } = await axios.get(
      `${baseUrl}?q=${searchTerm}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
    );
    dispatch(setLocations(data));
  };

  const handleOpenAddCity = () => {
    setOpenAddCity((prev) => !prev);
  };

  const handleOnchange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getWeatherByCityName();
  };

  const renderAddCityBtn = () => {
    return (
      <div className="add-city">
        <button className="btn" onClick={() => handleOpenAddCity()}>
          <img src={AddIcon} alt="add-icon" />
        </button>
        {openAddCity ? (
          <form>
            <input
              onChange={(e) => handleOnchange(e)}
              value={searchTerm}
            ></input>
            <button onClick={(e) => handleSearch(e)}>Aggiungi</button>
          </form>
        ) : (
          <h3 className="txt">Aggiungi città</h3>
        )}
      </div>
    );
  };

  const renderMobilePage = () => {
    return (
      <div className="mobile-content">
        <div className="header">
          <h1 className="greeting-title">Good Morning! Mario</h1>
        </div>
        {renderAddCityBtn()}
        {allLocations.length > 0 ? (
          <div className="city-card-container">
            {allLocations.map((location, index) => {
              return (
                <CityCard
                  key={index}
                  cityName={location.name}
                  temperature={location.main.temp}
                  weather={location.weather[0].main}
                  icon={location.weather[0].icon}
                />
              );
            })}
          </div>
        ) : null}
        <div className="nav-menu">
          <img role="button" src={Home} alt="home button" />
          <img role="button" src={Search} alt="seaarch button" />
          <img role="button" src={Location} alt="location button" />
        </div>
      </div>
    );
  };

  const renderDesktopPage = () => {
    return (
      <div className="desktop-content">
        {renderAddCityBtn()}
        <CityCard />
      </div>
    );
  };

  return (
    <div className="mainPage">
      {isMobile ? renderMobilePage() : renderDesktopPage()}
    </div>
  );
};

export default MainPage;
