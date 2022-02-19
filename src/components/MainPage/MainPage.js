import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/services/slices.js";

import CityCard from "../CityCard/CityCard.js";

import AddIcon from "./../../assets/Plus.png";

import "./styles/index.scss";

const MainPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { weather, loading, errror } = state;

  useEffect(() => {
    dispatch(fetchWeather("London"));
  }, []);

  const renderAddCityBtn = () => {
    return (
      <div className="add-city">
        <button className="btn">
          <img src={AddIcon} alt="add-icon" />
        </button>
        <h3 className="txt">Aggiungi città</h3>
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
        <div className="city-card-container">
          <CityCard />
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
