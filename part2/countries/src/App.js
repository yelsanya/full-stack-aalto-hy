import { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = (props) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${process.env.REACT_APP_OW}`)
    .then(response => {
        props.setWeather(response.data)
        console.log(response.data)
    })
    return (
        <>
            <h1>Weather in {props.city}</h1>
            <p>temperature {(props.weather.main.temp - 273.15).toFixed(2)} Celsius</p>
            <img alt="weather" src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}/>
            <p>wind {props.weather.wind.speed} m/s</p>
        </>
    )
}

const Find = (props) => {
  if (props.countries.length > 10) {
    return (
        <p>Too many matches, specify another filter</p>
    )
  }
  else if (props.countries.length === 1) {
    return (
        <>
          <h1>{props.countries[0].name}</h1>
          <p>capital {props.countries[0].capital}</p>
          <p>area {props.countries[0].area}</p>
          <b>languages</b>
          <ul>
            {props.countries[0].languages.map((language, id) =>
              <li key={id}>{language}</li>
            )}
          </ul>
          <img src={props.countries[0].flag} alt="Flag"/>
          <Weather city={props.countries[0].capital} weather={props.weather} setWeather={props.setWeather}/>
        </>
    )
  }
  else {
    return (
        <ul>
          {props.countries.map((country, id) =>
              <li key={id}>
                  {country.name} <button onClick={() => props.setCountries([country])}>show </button>
                  </li>
          )}
        </ul>
    )
  }
}

function App() {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"
  const [showCountries, setShowCountries] = useState([])
  const [weather, setWeather] = useState({
        main: {temp: 273.15},
        weather: [{icon: "09d"}],
        wind: {speed: 0}
    })
  let allCountries = []

  useEffect(() => {
    axios.get(`${baseUrl}/all`).then(response => {
        allCountries = response.data.map((country, id) => {
          return {
            area: country.area ? country.area : "Undefined",
            capital: country.capital ? country.capital[0] : "Undefined",
            languages: Object.values(country.languages ? country.languages : []),
            name: country.name.common,
            flag: country.flags.png,
            id: id
          }
        })
    })
  })

  const handleSearchChange = (event) => {
    let results = allCountries.reduce((filtered, country) => {
      if (country.name.toLowerCase().includes(event.target.value.toLowerCase())){
        filtered.push(country)
      }
      return filtered
    }, [])
    setShowCountries(results)
    console.log(results)
  }

  return (
    <>
      <p>find countries</p>
      <input onChange={handleSearchChange}/>
      <Find countries={showCountries} setCountries={setShowCountries} weather={weather} setWeather={setWeather}/>
    </>
  );
}

export default App
