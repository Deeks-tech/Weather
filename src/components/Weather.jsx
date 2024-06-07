import React, { useState, useEffect } from "react";

function Weather() {
  const [data, setData] = useState({});

  const [inputValue, setInputValue] = useState("");

  const [query, setQuery] = useState("London"); // having london here means on first render there is a query and the API will be called and not log a 400 error
  const [country, setCountry] = useState("United Kingdom");

  const fetchData = () => {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=89700a0fd86940b2a36110020241305&q=${query}&aqi=no`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`http error : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const condition = data.current?.condition?.text;
  const temp = data.current?.temp_c;
  const icon = data.current?.condition?.icon;
  const wind = data.current?.wind_mph;
  const location = data.location?.country;

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleClick() {
    setQuery(inputValue);
    setCountry(location);
  }

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <div className="container">
      <h1> Weather App 😎</h1>
      <div>
        <input
          name="search"
          placeholder="Enter a new Location"
          onChange={handleChange}
        />
        <button onClick={handleClick}>Go !</button>
      </div>
      <div className="weather-container">
        <h2>{`${temp}°C`} </h2>
        <h3>{condition}</h3>
        <img src={icon ? `${icon}` : "location needed"} alt="Weather icon" />
        <h4> {`${wind} mph wind`}</h4>
        <h5>
          {query.toUpperCase()}, {country.toUpperCase()}
        </h5>
      </div>
    </div>
  );
}

export default Weather;
