// WeatherCard.jsx
import React from "react";

const WeatherCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mt-6 w-full max-w-md transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{data.name}</h2>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-5xl font-bold text-blue-600 dark:text-blue-300">{Math.round(data.main.temp)}°C </p>
          <p className="text-gray-700 dark:text-gray-200">{data.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-20 h-20"
        />
      </div>
        <p className="text-gray-700 dark:text-gray-200">Humidity: {data.main.humidity}%</p>
        <p className="text-gray-700 dark:text-gray-200">Wind: {data.wind.speed} m/s</p>
      </div>
  
  );
};

export default WeatherCard;
