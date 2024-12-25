import request from "request";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;

console.log(apiKey);

const forcast = (lat, lon, callback) => {
  const units = "metric"; // C
  const currectWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  request({ url: currectWeatherUrl, json: true }, (error, response) => {
    if (error) {
      callback(`Unable to connect to weather service!!`, undefined);
    } else if (response.body.cod === "400") {
      callback(
        `Unable to find weather data for provided coordinates`,
        undefined
      );
    } else {
      const weatherData = response.body;
      const main = weatherData.weather[0].main;
      const temp = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;
      const name = weatherData.name;
      callback(undefined, {
        lat,
        lon,
        main,
        temp,
        feelsLike,
        name,
        units: "°C",
      });
    }
  });
};

export { forcast };
