import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "Delhi");
  const [unit, setUnit] = useState("metric"); // Default Celsius

  const API_KEY = import.meta.env.VITE_API_KEY;
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`;
  const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`;

  const fetchWeather = async () => {
    try {
      setError(null);
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(WEATHER_URL),
        axios.get(FORECAST_URL),
      ]);
      setWeather(weatherResponse.data);

      // Extract daily forecasts (every 24 hours at noon)
      const dailyForecasts = forecastResponse.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecasts);

      localStorage.setItem("lastCity", city);
    } catch (err) {
      setError("City not found. Please try again.");
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 30000);
    return () => clearInterval(interval);
  }, [city, unit]);

  return (
    <WeatherContext.Provider
      value={{ weather, forecast, city, setCity, unit, setUnit, error }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
