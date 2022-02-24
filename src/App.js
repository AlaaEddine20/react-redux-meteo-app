import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./components/DetailPage/DetailPage.js";
import MainPage from "./components/MainPage/MainPage.js";

import "./index.scss";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/details/:id" element={<DetailPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
