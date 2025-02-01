import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const ForecastDisplay = () => {
  const { forecast } = useContext(WeatherContext);

  return (
    <div className="forecast-container">
      <h2 className="text-xl font-semibold mt-4 mb-2">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day) => (
          <div
            key={day.dt}
            className="forecast-card p-4 bg-blue-200 rounded-lg shadow-md"
          >
            <p className="font-medium">
              {new Date(day.dt * 1000).toLocaleDateString()}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="weather icon"
              className="mx-auto"
            />
            <p className="text-lg font-bold">{day.main.temp}°</p>
            <p className="capitalize">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
