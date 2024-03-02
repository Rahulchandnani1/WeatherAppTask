// src/components/WeatherApp.js

import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const WeatherApp = () => {
    const [apiData, setApiData] = useState({});
    const [getState, setGetState] = useState('');
    const [state, setState] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [submit,setsubmit]=useState(false);
    const [unit, setUnit] = useState('metric');
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state},uk&APPID=2a365781a11fa8669beb2dd5f36c3891`;
  useEffect(() => {
  
      fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
   
      updateRecentSearches(state);
  }, [apiUrl]);
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };
  
  const submitHandler = () => {
    
    setState(getState);
setsubmit(true);
setGetState(" ")

  };
  const handleToggle = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    // Fetch weather data again with the new unit
  };

  const convertTemp = (temp) => {
    if (unit === 'imperial') {
      return (temp * 9/5) + 32; // Convert Celsius to Fahrenheit
    } else {
      return temp; // Temperature is already in Celsius
    }
  };
  const updateRecentSearches = (city) => {
    if (!recentSearches.includes(city)) {
      const updatedSearches = [city, ...recentSearches.slice(0, 4)];
      setRecentSearches(updatedSearches);
    }
  };

  const handleRecentSearch = (searchedCity) => {
    
    setState(searchedCity);
    
  };

console.log(recentSearches.length,"data")
  return (
    <div className='container'>
      <input
        type="text"
        placeholder="Enter city name"
        value={getState}
        onChange={inputHandler}
      />
      <button onClick={submitHandler}>Search</button>
      <div>
        <label>
          <input
           type="checkbox"
           checked={unit === 'imperial'}
           onChange={handleToggle}
          />
          Fahrenheit
        </label>
      </div>
      

      {apiData.main ?
        <div className='searchdata'>
          <h2>{apiData.name}</h2>
          <h1>{apiData.message}</h1>
          <p>Temperature: {convertTemp(apiData.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p>Weather: {apiData.weather[0].main}</p>
          <p>Wind Speed: {apiData.wind.speed} m/s</p>
        </div>
      :submit?<div className='searchdata'> {state?<> <p>{state}</p> <p>{"City Not Found!"}</p></>:"Please enter a city name"}</div>:""}
   
    
    <div>
        <h3>Recent Searches:</h3>
        {recentSearches.length>1 ?<ul>
          {recentSearches.map((searchedCity, index) => (
            <li key={index} onClick={() => handleRecentSearch(searchedCity)}>
              {searchedCity}
            </li>
          ))}
        </ul>:""}
      </div>
      <marquee>By Rahul Chandnani</marquee>
    </div>
   
  );
};

export default WeatherApp;
