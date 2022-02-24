import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const allLocations = useSelector((state) => state.weatherReducer.locations);

  const { id } = useParams();

  const currentItem =
    allLocations.length > 0 ? allLocations.find((item) => id == item.id) : {};

  return <div>{currentItem.name}</div>;
};

export default DetailPage;
