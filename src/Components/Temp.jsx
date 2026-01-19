import { useEffect, useState, useCallback } from "react";
import "../App.css";
import axios from "axios";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchData, setSearchData] = useState("karachi");
  const [weatherInfo, setWeatherInfo] = useState({});

  const getWeatherInfo = useCallback(async () => {
    try {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${searchData}&units=metric&appid=68b54a3618456ad3799a8e7bc6af6905`;

      const response = await axios.get(API);

      const { humidity, pressure, temp } = response.data.main;
      const { country, sunset } = response.data.sys;
      const { name } = response.data;
      const { speed } = response.data.wind;
      const { main: weathermood } = response.data.weather[0];

      setWeatherInfo({
        humidity,
        pressure,
        temp,
        country,
        sunset,
        name,
        speed,
        weathermood,
      });
    } catch (error) {
      console.log(error);
    }
  }, [searchData]);

  useEffect(() => {
    getWeatherInfo();
  }, [getWeatherInfo]);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            autoFocus
            placeholder="search..."
            id="search"
            className="searchTerm"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <WeatherCard tempInfo={weatherInfo} />
    </>
  );
};

export default Temp;
