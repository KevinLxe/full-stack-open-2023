import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
    const [weatherData, setWeatherData] = useState(null);
    const key = process.env.REACT_APP_API_KEY;
    const { lat, lng } = country.capitalInfo.latlng;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}&units=metric`;

    useEffect(() => {
        axios.get(url).then(response => setWeatherData(response.data));
    }, [url]);

    if (!weatherData) return null;

    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    return (
        <>
            <h3>Weather in {country.capital}</h3>
            <div>temperature {weatherData.main.temp.toFixed(2)} Celcius</div>
            <img src={iconUrl} alt="weatherIcon" />
            <div>wind {weatherData.wind.speed} m/s</div>
        </>
    );
};

const CountryDetails = ({ country }) => (
    <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h3>Languages:</h3>
        <ul>
            {Object.values(country.languages).map(language => (
                <li key={language}>{language}</li>
            ))}
        </ul>
        <img alt={country.flag} src={country.flags.png} />
        <Weather country={country} />
    </div>
);

const Countries = ({ countriesToShow, handleClick }) => {
    if (countriesToShow.length > 10) return <div>Too many matches, specify another filter</div>;
    if (countriesToShow.length === 1) return <CountryDetails country={countriesToShow[0]} />;
    if (countriesToShow.length === 0) return <div>0 matches, try another search</div>;

    return (
        <>
            {countriesToShow.map(country => (
                <div key={country.ccn3}>
                    {country.name.common}{" "}
                    <button onClick={() => handleClick(country.name.common)}>
                        show
                    </button>
                </div>
            ))}
        </>
    );
};

const App = () => {
    const [newSearchCountry, setNewSearchCountry] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then(response => setCountries(response.data));
    }, []);

    const handleSearchCountry = event => {
        setNewSearchCountry(event.target.value);
    };

    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newSearchCountry.toLowerCase()));

    return (
        <div>
            find countries <input value={newSearchCountry} onChange={handleSearchCountry} />
            <Countries countriesToShow={countriesToShow} handleClick={setNewSearchCountry} />
        </div>
    );
};

export default App;
