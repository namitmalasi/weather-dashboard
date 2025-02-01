import { WeatherProvider } from "./context/WeatherContext";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";

const App = () => {
  return (
    <WeatherProvider>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-400 to-purple-500 text-white">
        <h1 className="text-3xl font-bold mt-6">Weather Dashboard</h1>
        <div className="container p-6">
          <SearchBar />
          <WeatherDisplay />
          <ForecastDisplay />
        </div>
      </div>
    </WeatherProvider>
  );
};

export default App;
