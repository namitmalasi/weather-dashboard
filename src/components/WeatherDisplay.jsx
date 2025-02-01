import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const WeatherDisplay = () => {
  const { weather, error, unit } = useContext(WeatherContext);

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4 bg-red-100 p-3 rounded-lg shadow-md">
        {error}
      </div>
    );
  }

  if (!weather) {
    return <div className="text-gray-500 mt-4">Loading weather data...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white/20 backdrop-blur-lg shadow-lg rounded-xl p-6 mt-6 w-full max-w-md border border-white/30">
      <h2 className="text-2xl font-semibold text-white">{weather.name}</h2>

      {/* Weather Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        className="w-20 h-20"
      />

      {/* Temperature and Condition */}
      <p className="text-4xl font-bold text-white">
        {weather.main.temp}°{unit === "metric" ? "C" : "F"}
      </p>
      <p className="capitalize text-lg text-gray-200">
        {weather.weather[0].description}
      </p>

      {/* Additional Details */}
      <div className="flex justify-between w-full mt-4 text-white">
        <div className="flex flex-col items-center">
          <p className="text-sm">Humidity</p>
          <p className="text-lg font-semibold">{weather.main.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm">Wind</p>
          <p className="text-lg font-semibold">
            {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm">Feels Like</p>
          <p className="text-lg font-semibold">{weather.main.feels_like}°</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
