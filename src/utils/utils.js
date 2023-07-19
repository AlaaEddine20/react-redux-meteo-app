export const giveClassByWeatherType = (weather) => {
    if (weather) {
      if (weather === "Clouds") {
        return "clouds";
      } else if (weather === "Clear") {
        return "clear";
      } else if (weather === "Rain") {
        return "rain";
      } else if (weather === "Snow") {
        return "snow";
      } else if (weather === "Haze") {
        return "haze";
      }
    } else {
      return ""
    }
  };