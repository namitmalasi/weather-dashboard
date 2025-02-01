import { useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const { setCity, unit, setUnit } = useContext(WeatherContext);

  const handleSearch = () => {
    if (input.trim() !== "") {
      setCity(input);
      setInput("");
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg shadow-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name..."
        className="px-4 py-2 border rounded-md focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Search
      </button>
      <button
        onClick={toggleUnit}
        className="px-4 py-2 bg-gray-700 text-white rounded-md"
      >
        {unit === "metric" ? "Switch to °F" : "Switch to °C"}
      </button>
    </div>
  );
};

export default SearchBar;
