import React, { useState } from "react";
import "./styles.css";

function Weather() {
  const apiKey = "e38685bb88270446917d12206d2d323d";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key == "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
      )
        .then((responese) => responese.json())
        .then((data) => setWeatherData(data));
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Enter City..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p className="welcome">welcome to the weather app!</p>
        </div>
      ) : (
        <div>
          <p className="city">{weatherData.name}</p>
          <p className="temp">{Math.round(weatherData.main.temp)}°F</p>
          <p className="weather">{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod === "404" ? (
        <p className="not_found">City not found</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Weather;
