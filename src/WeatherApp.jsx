import { useState } from "react";
import InfoBox from "./infoBox";
import SearchBox from "./SearchBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Kolkata",
    feelsLike: 35,
    temp: 35.14,
    tempMin: 27.09,
    tempMax: 28.91,
    humidity: 83,
    weather: "Scattered Clouds",
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2
        style={{
          display: "block",
          color: "#111827",
          fontSize: "2rem",
          margin: 0,
        }}
      >
        Weather App
      </h2>
      <hr></hr>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
