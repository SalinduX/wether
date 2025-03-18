import React, { useState, useEffect } from 'react';
import './weather.css'; 

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Colombo');
  const [inputCity, setInputCity] = useState('');
  const apiKey = '4cf45089287c1a4d485a1c384975b213';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  const handleSearch = () => {
    setCity(inputCity);
  };

  if (!weatherData) {
    return (
      <div className="weather-container">
        <div className="search-container">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city name"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="weather-container">
      <div className="search-container">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="weather-info">
        <h2>Weather in {weatherData.name}</h2>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Description: {weatherData.weather[0].description}</p>
      </div>
    </div>
  );
}

export default Weather;