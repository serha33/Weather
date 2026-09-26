import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getWeatherInfo = async (cityName) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`,
    );

    if (!response.ok) {
      throw new Error("City not found. Please try another city.");
    }

    const data = await response.json();
    const result = {
      city: cityName,
      temp: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      feelsLike: data.main.feels_like,
      weather: data.weather[0].description,
    };

    console.log(result);
    return result;
  };

  const handleChange = (event) => {
    setCity(event.target.value);
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setErrorMessage("Please enter a city name.");
      return;
    }

    try {
      const newInfo = await getWeatherInfo(trimmedCity);
      updateInfo(newInfo);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error.message);
    } finally {
      setCity("");
    }
  };

  return (
    <div className="search-box-wrapper">
      <h4>Search for the weather</h4>
      <form className="search-form" onSubmit={handleSubmit}>
        <TextField
          label="City Name"
          id="City"
          className="city-input"
          value={city}
          sx={{
            "& .MuiInputBase-root": {
              height: "56px",
            },
          }}
          required
          onChange={handleChange}
          error={Boolean(errorMessage)}
          helperText={errorMessage || " "}
        />
        <Button type="submit" variant="contained" className="search-button">
          Search
        </Button>
      </form>
    </div>
  );
}
