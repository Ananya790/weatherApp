import React, { useState , useEffect} from "react";
import axios from "axios";
import WeatherCard from "./components/Weathercard";
import ForecastCard from "./components/Forecastcard";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [darkMode, setDarkMode] = useState(false); 



  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };


  const saveToHistory = (cityName) => {
    setHistory((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
      return [cityName, ...filtered].slice(0, 5);
    });
  };


  const fetchWeather = async (overrideCity) => {
    const query = overrideCity || city;
    if (!query) return;

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const encodedCity = encodeURIComponent(query);

    setLoading(true);
    setErrorMsg("");
    setWeatherData(null);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(res.data);
      saveToHistory(res.data.name);
    } catch (err) {
      console.error("API error:", err);
      setErrorMsg("Couldn't find that city");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") 
      fetchWeather();
  };

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
<div className="min-h-screen bg-blue-100 dark:bg-gray-600 p-6 flex flex-col items-center transition-colors duration-500">

      <h1 className="text-3xl font-bold mb-4">🌤️ Weather Dashboard</h1>
      <button 
      onClick={toggleTheme}  
      className="m-4 p-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded" > 
        {darkMode ? "☀️ Light" : "🌙 Dark"} 
        </button>

      <div className="w-full max-w-md">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="city name"
          className="w-full p-2 rounded shadow border"
        />
        <button
          onClick={() => fetchWeather()}
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
          
        </button>
        {history.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold">Recent:</p>
            <ul className="flex flex-wrap gap-2 mt-1">
              {history.map((c, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer text-blue-700 underline hover:text-blue-900"
                  onClick={() => fetchWeather(c)}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {loading && <p className="mt-4">Fetching data...</p>}
      {errorMsg && <p className="mt-4 text-red-500">{errorMsg}</p>}
      {weatherData && (
        <>
          <WeatherCard data={weatherData} />
          <ForecastCard city={weatherData.name} />
        </>
      )}
    </div>
  );
};

export default App;