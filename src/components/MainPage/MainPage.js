import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { addLocations } from "../../redux/actions/index";

import CityCard from "../CityCard/CityCard.js";

import AddIcon from "./../../assets/Plus.png";
import Home from "./../../assets/Home.png";
import Search from "./../../assets/Search.png";
import Location from "./../../assets/Location.png";

import "./styles/index.scss";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddCity, setOpenAddCity] = useState(false);
  const [activeStickyMenu, setActiveStickyMenu] = useState("home");
  const [apiError, setApiError] = useState(false)

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const allLocations = useSelector((state) => state.weatherReducer.locations);

  const dispatch = useDispatch();

  const menuItems = [
    {
      name: "home",
      icon: Home,
    },
    {
      name: "search",
      icon: Search,
    },
    {
      name: "location",
      icon: Location,
    },
  ];

  const getWeatherByCityName = async () => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

    try {
      const res = await axios.get(
        `${baseUrl}?q=${searchTerm}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
      );
      dispatch(addLocations(res.data));
      // setApiError(false)
    } catch (err) {
      setApiError(true)
      console.log(err)
    }
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
        <button className="btn" onClick={handleOpenAddCity}>
          {!openAddCity && <img src={AddIcon} alt="add-icon" />}
        </button>
        {openAddCity ? (
          <form>
            <input
              onChange={handleOnchange}
              value={searchTerm}
            ></input>
            <button onClick={handleSearch}>
              <img src={Search} alt="search button" />
            </button>
          </form>
        ) : (
          <h3 className="txt">Aggiungi città</h3>
        )}
      </div>
    );
  };

  const renderMenuItems = () => {
    return (
      <div className="mobile-menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${activeStickyMenu === item.name && "active"
              }`}
          >
            <img
              id={item.name}
              role="button"
              src={item.icon}
              alt="home button"
              onClick={() => setActiveStickyMenu(item.name)}
            />
          </div>
        ))}
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
        {allLocations.length > 0
          && allLocations.map((location) => (
            <div key={location.id} className="city-card-container">
              <Link to={`/details/${location.id}`}>
                <CityCard
                  key={location.id}
                  cityName={location.name}
                  temperature={location.main.temp}
                  weather={location.weather[0].main}
                  icon={location.weather[0].icon}
                />
              </Link>
            </div>
          )).reverse()}
        {renderMenuItems()}
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
