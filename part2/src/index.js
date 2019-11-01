import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  const [countrySearch, setCountrySearch] = useState({
    searchText: "",
    searchResult: []
  });
  const [weatherData, setWeatherData] = useState({});

  const handleSearch = () => {
    console.log('hey')
    axios.get("https://restcountries.eu/rest/v2/all").then(({ data }) => {
      const results = data.filter(country =>
        country.name
          .toLowerCase()
          .includes(countrySearch.searchText.toLowerCase())
      );
      if(results.length === 1) {
        axios
        .get(
          `http://api.weatherstack.com/current?access_key=${"8514b97074527e69c12d7919d70a329c"}&query=${results[0].name}`
        )
        .then(({ data }) => {
          setWeatherData(data);
          setCountrySearch({ searchResult: results, searchText: "" });
        })
      } else {
        setCountrySearch({ searchResult: results, searchText: "" });
      }
    });
  };

  const handleClickShow = key => {
    const result = countrySearch.searchResult.filter(
      country => country.callingCodes[0] === key
    );
    axios
        .get(
          `http://api.weatherstack.com/current?access_key=${"8514b97074527e69c12d7919d70a329c"}&query=${result[0].name}`
        )
        .then(({ data }) => {
          setWeatherData(data);
          setCountrySearch({ ...countrySearch, searchResult: result });
        })
  };

  const formatResult = () => {
    if (countrySearch.searchResult.length > 10) {
      return <li>Too many matches, specify another filter</li>;
    } else if (countrySearch.searchResult.length === 1) {
      const {
        name,
        flag,
        languages,
        capital,
        population
      } = countrySearch.searchResult[0];
      const { temperature, weather_icons, wind_speed, wind_dir } = weatherData.current;
      return (
        <li>
          <h2>{name}</h2>
          <img src={flag} alt="country flag" style={{ maxWidth: "100%" }} />
          <p>
            <strong>Capital</strong>: {capital}
          </p>
          <h3>Languages</h3>
          {languages.map(lang => (
            <p key={lang.name}>{lang.name}</p>
          ))}
          <p>
            <strong>Population</strong>: {population}
          </p>
          <h3>Weather in {weatherData.location.name}</h3>
          <p><strong>Temperature</strong>: {temperature} Celsius</p>
          <img src={weather_icons[0]} alt="" />
          <p><strong>Wind</strong>: {wind_speed} kph direction {wind_dir}</p>
        </li>
      );
    } else {
      return countrySearch.searchResult.map(country => (
        <li key={country.callingCodes[0]}>
          {country.name}
          <button onClick={() => handleClickShow(country.callingCodes[0])}>
            Show
          </button>
        </li>
      ));
    }
  };

  return (
    <div>
      <h1>Find countries: </h1>
      <input
        value={countrySearch.searchText}
        onChange={e =>
          setCountrySearch({ ...countrySearch, searchText: e.target.value })
        }
      />
      <button onClick={handleSearch}>Search</button>
      <ul>{formatResult()}</ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
