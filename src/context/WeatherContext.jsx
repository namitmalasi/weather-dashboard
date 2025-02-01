import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

const WeatherContext = createContext(undefined);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("celsius");

  const searchCity = useCallback(async (city) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}`, {
        params: {
          q: city,
          key: `${import.meta.env.VITE_API_KEY}`,
        },
      });

      setWeatherData(response.data);
      localStorage.setItem("lastCity", city);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load last searched city on mount
  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      searchCity(lastCity);
    }
  }, [searchCity]);

  // Poll weather data every 30 seconds
  useEffect(() => {
    if (!weatherData?.name) return;

    const interval = setInterval(() => {
      searchCity(weatherData.name);
    }, 30000);

    return () => clearInterval(interval);
  }, [weatherData?.name, searchCity]);

  return (
    <WeatherContext.Provider
      value={{ weatherData, loading, error, searchCity, unit, setUnit }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
